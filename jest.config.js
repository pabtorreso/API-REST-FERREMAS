module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/unit/**/*.test.ts'],
    testTimeout: 20000,
    maxWorkers: 1, // Ejecuta las pruebas en un solo hilo
  };
  