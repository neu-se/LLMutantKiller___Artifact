import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating an instance from an object', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    expect(() => GeoPoint.fromObject(object)).toThrowError('GeoPoint: Argument must be an object');
  });
});