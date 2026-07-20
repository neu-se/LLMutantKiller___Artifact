import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create an instance from an object', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    const geoPoint = GeoPoint.fromObject(object);
    expect(geoPoint.toObject()).toEqual(object);
  });
});