import {appConfig} from '@app/config';

export type AnalyticsProvider = 'firebase' | 'mixpanel' | 'amplitude';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

class AnalyticsService {
  private provider: AnalyticsProvider | null = null;

  initialize(provider: AnalyticsProvider): void {
    this.provider = provider;
  }

  trackEvent(_event: AnalyticsEvent): void {
    if (!appConfig.enableAnalytics) {
      return;
    }
    // Adapter pattern — swap provider without changing call sites
    switch (this.provider) {
      case 'firebase':
        break;
      case 'mixpanel':
        break;
      case 'amplitude':
        break;
      default:
        break;
    }
  }

  trackScreen(screenName: string): void {
    this.trackEvent({name: 'screen_view', properties: {screen: screenName}});
  }

  setUserId(_userId: string): void {
    if (!appConfig.enableAnalytics) {
      return;
    }
  }
}

export const analyticsService = new AnalyticsService();
