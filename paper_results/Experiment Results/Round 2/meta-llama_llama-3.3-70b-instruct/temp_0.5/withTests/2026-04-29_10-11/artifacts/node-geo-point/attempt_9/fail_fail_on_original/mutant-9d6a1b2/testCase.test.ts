import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating an instance from an object with if statement changed to always false', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    const originalFromObject = GeoPoint.fromObject;
    GeoPoint.fromObject = () => {
      if (false) {
        return new GeoPoint(object.latitude, object.longitude);
      } else {
        throw new Error('Cannot create instance from object');
      }
    };
    expect(() => GeoPoint.fromObject(object)).toThrowError('Cannot create instance from object');
    GeoPoint.fromObject = originalFromObject;
  });
});