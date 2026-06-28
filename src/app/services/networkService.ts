import NetInfo from '@react-native-community/netinfo';
import {logger} from '@app/logger';

export interface QueuedRequest {
  id: string;
  execute: () => Promise<void>;
}

class NetworkService {
  private queue: QueuedRequest[] = [];
  private isOnline = true;

  initialize(): () => void {
    return NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = Boolean(state.isConnected && state.isInternetReachable);

      if (wasOffline && this.isOnline) {
        logger.info('Network restored — processing offline queue');
        this.processQueue().catch(() => {});
      }
    });
  }

  getIsOnline(): boolean {
    return this.isOnline;
  }

  enqueue(request: QueuedRequest): void {
    this.queue.push(request);
    logger.debug('Request queued for offline retry', {id: request.id});
  }

  private async processQueue(): Promise<void> {
    const pending = [...this.queue];
    this.queue = [];

    for (const request of pending) {
      try {
        await request.execute();
      } catch (error) {
        logger.error('Offline queue retry failed', {id: request.id, error});
        this.queue.push(request);
      }
    }
  }
}

export const networkService = new NetworkService();
