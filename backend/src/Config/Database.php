<?php

namespace App\Config;

/**
 * Configuración de base de datos
 * 
 * Maneja la conexión a la base de datos MySQL
 * 
 * @package App\Config
 */

class Database
{
    private static $connection = null;

    /**
     * Obtener instancia de conexión a base de datos
     * 
     * @return \PDO
     */
    public static function getConnection()
    {
        if (self::$connection === null) {
            self::connect();
        }
        return self::$connection;
    }

    /**
     * Establecer conexión a la base de datos
     * 
     * @return void
     */
    private static function connect()
    {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $port = $_ENV['DB_PORT'] ?? 3306;
        $dbname = $_ENV['DB_NAME'] ?? 'rayos_cosmicos';
        $user = $_ENV['DB_USER'] ?? 'root';
        $password = $_ENV['DB_PASS'] ?? '';

        $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

        try {
            self::$connection = new \PDO($dsn, $user, $password, [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            ]);
        } catch (\PDOException $e) {
            throw new \Exception('Database connection failed: ' . $e->getMessage());
        }
    }

    /**
     * Cerrar conexión
     * 
     * @return void
     */
    public static function closeConnection()
    {
        self::$connection = null;
    }
}
