import {PERMISSIONS, Permission, request, check, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import {logger} from '@app/logger';

export enum PermissionType {
  CAMERA = 'camera',
  PHOTO_LIBRARY = 'photo_library',
  LOCATION = 'location',
  NOTIFICATIONS = 'notifications',
}

const permissionMap: Record<PermissionType, Permission | undefined> = {
  [PermissionType.CAMERA]:
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  [PermissionType.PHOTO_LIBRARY]:
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  [PermissionType.LOCATION]:
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  [PermissionType.NOTIFICATIONS]: undefined,
};

class PermissionService {
  async checkPermission(type: PermissionType): Promise<boolean> {
    const permission = permissionMap[type];
    if (!permission) {
      return false;
    }
    const result = await check(permission);
    return result === RESULTS.GRANTED;
  }

  async requestPermission(type: PermissionType): Promise<boolean> {
    const permission = permissionMap[type];
    if (!permission) {
      logger.warn('Permission not mapped for platform', {type});
      return false;
    }
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  }
}

export const permissionService = new PermissionService();
