/**
 * Camada de integracao com Apple Health (HealthKit) e Health Connect / Google Fit.
 *
 * Ainda nao implementada de fato: requer build nativo (expo prebuild) e um dispositivo
 * fisico para testar permissoes, o que nao esta disponivel neste ambiente. A interface
 * abaixo define o contrato que a UI ja pode chamar; troque a implementacao "stub" por
 * `react-native-health` (iOS) / `react-native-health-connect` (Android) quando for rodar
 * localmente. Veja o README, secao "Integracao com Apple Health / Health Connect".
 */

export type HealthSample = {
  date: string;
  steps?: number;
  activeEnergyKcal?: number;
  distanceMeters?: number;
  heartRateBpm?: number;
  sleepMinutes?: number;
};

export interface HealthService {
  isAvailable(): Promise<boolean>;
  requestPermissions(): Promise<boolean>;
  getDailySummary(date: string): Promise<HealthSample | null>;
}

class StubHealthService implements HealthService {
  async isAvailable() {
    return false;
  }

  async requestPermissions() {
    return false;
  }

  async getDailySummary(_date: string) {
    return null;
  }
}

export const healthService: HealthService = new StubHealthService();
