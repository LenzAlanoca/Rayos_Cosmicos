<?php

/**
 * Punto de entrada de la aplicación
 * 
 * Este es el archivo principal que inicializa la aplicación y maneja todas las rutas
 * 
 * @version 0.1.0-beta
 */

use App\Config\Database;
use App\Config\AppLogger;
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Cargar autoloader de composer
require __DIR__ . '/../vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

// Crear aplicación
$app = AppFactory::create();

// Middleware de CORS
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->withHeader('Content-Type', 'application/json');
});

// Middleware de registro
// TEMPORARY: Comentar mientras se arregla el issue del Logger
// $logger = AppLogger::getInstance();
// $app->add(function ($request, $handler) use ($logger) {
//     $logger->info("Request: {$request->getMethod()} {$request->getUri()}");
//     return $handler->handle($request);
// });

// Rutas públicas
$app->get('/api/health', function (Request $request, Response $response) {
    return $response->withStatus(200)->write(json_encode([
        'status' => 'ok',
        'version' => $_ENV['APP_VERSION'] ?? '0.1.0-beta',
        'timestamp' => date('Y-m-d H:i:s')
    ]));
});

$app->get('/api/sensors', function (Request $request, Response $response) {
    // Placeholder - será implementado con el módulo de sensores
    return $response->withStatus(200)->write(json_encode([
        'data' => [
            ['id' => 1, 'name' => 'Sensor α', 'location' => 'Lab Principal', 'active' => true],
            ['id' => 2, 'name' => 'Sensor β', 'location' => 'Azotea', 'active' => true],
            ['id' => 3, 'name' => 'Sensor γ', 'location' => 'Sótano', 'active' => true],
            ['id' => 4, 'name' => 'Sensor δ', 'location' => 'Lab Secundario', 'active' => false]
        ]
    ]));
});

$app->get('/api/data', function (Request $request, Response $response) {
    // Placeholder - será implementado con el módulo de datos
    return $response->withStatus(200)->write(json_encode([
        'data' => [
            ['timestamp' => date('Y-m-d H:i:s'), 'sensor_id' => 1, 'value' => 245, 'unit' => 'CPM'],
            ['timestamp' => date('Y-m-d H:i:s'), 'sensor_id' => 2, 'value' => 189, 'unit' => 'CPM'],
        ]
    ]));
});

// Manejo de errores
// TEMPORARY: Comentar mientras se arregla el issue del Logger
// $errorMiddleware = $app->addErrorMiddleware(true, true, true);
// $errorMiddleware->setDefaultErrorHandler(function ($request, $exception, $displayErrorDetails) use ($logger) {
//     $logger->error("Error: " . $exception->getMessage());
//     return null;
// });

// Ejecutar aplicación
$app->run();
