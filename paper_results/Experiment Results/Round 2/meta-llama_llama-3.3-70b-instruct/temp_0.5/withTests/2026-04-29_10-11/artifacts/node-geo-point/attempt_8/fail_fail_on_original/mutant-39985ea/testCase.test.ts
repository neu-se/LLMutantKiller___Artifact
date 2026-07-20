import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating from object with all properties', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    expect(() => GeoPoint.fromObject(object)).not.toThrowError();
  });
});