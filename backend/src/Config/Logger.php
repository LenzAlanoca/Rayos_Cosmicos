<?php

namespace App\Config;

use Monolog\Logger;
use Monolog\Handlers\StreamHandler;
use Monolog\Handlers\RotatingFileHandler;

/**
 * Configuración de logging
 * 
 * Proporciona instancia de logger para toda la aplicación
 * 
 * @package App\Config
 */

class AppLogger
{
    private static $instance = null;

    /**
     * Obtener instancia singleton del logger
     * 
     * @return \Monolog\Logger
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::initLogger();
        }
        return self::$instance;
    }

    /**
     * Inicializar logger con Monolog
     * 
     * @return void
     */
    private static function initLogger()
    {
        $logFile = $_ENV['LOG_FILE'] ?? 'storage/logs/app.log';
        $logLevel = $_ENV['LOG_LEVEL'] ?? 'info';

        // Asegurar que el directorio existe
        $logDir = dirname($logFile);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }

        self::$instance = new \Monolog\Logger('rayos-cosmicos');

        // Handler para archivo
        self::$instance->pushHandler(
            new RotatingFileHandler($logFile, 10, constant('\Monolog\Logger::' . strtoupper($logLevel)))
        );

        // Handler para consola en desarrollo
        if ($_ENV['APP_ENV'] === 'development') {
            self::$instance->pushHandler(
                new StreamHandler('php://stdout', constant('\Monolog\Logger::' . strtoupper($logLevel)))
            );
        }
    }
}
