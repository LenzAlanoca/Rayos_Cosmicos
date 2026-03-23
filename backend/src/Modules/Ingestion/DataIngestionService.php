<?php

namespace App\Modules\Ingestion;

/**
 * Módulo de Ingestión de Datos
 * 
 * Responsable de recibir datos de los sensores y validarlos
 * 
 * @package App\Modules\Ingestion
 */

class DataIngestionService
{
    /**
     * Recibir datos de un sensor
     * 
     * @param array $data Datos del sensor
     * @return array Resultado de la ingestión
     */
    public function ingestData(array $data): array
    {
        // Validar datos
        if (!$this->validateSensorData($data)) {
            return [
                'success' => false,
                'message' => 'Datos de sensor inválidos'
            ];
        }

        // Procesar
        // TODO: Guardar en base de datos
        return [
            'success' => true,
            'message' => 'Datos ingestionados correctamente',
            'data_id' => uniqid()
        ];
    }

    /**
     * Validar datos del sensor
     * 
     * @param array $data
     * @return bool
     */
    private function validateSensorData(array $data): bool
    {
        // Validaciones básicas
        return isset($data['sensor_id'])
            && isset($data['value'])
            && isset($data['unit'])
            && is_numeric($data['value']);
    }

    /**
     * Recibir múltiples datos
     * 
     * @param array $dataArray
     * @return array
     */
    public function ingestBatchData(array $dataArray): array
    {
        $results = [];
        foreach ($dataArray as $data) {
            $results[] = $this->ingestData($data);
        }
        return $results;
    }
}
