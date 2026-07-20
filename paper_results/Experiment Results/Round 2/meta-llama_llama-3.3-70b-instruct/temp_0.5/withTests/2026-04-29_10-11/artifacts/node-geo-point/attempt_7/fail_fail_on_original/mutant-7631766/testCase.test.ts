import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not create a GeoPoint from an object without latitude and longitude in the mutated code', () => {
    const obj = { latitude: 51.5, longitude: -0.15 };
    const point = GeoPoint.fromObject(obj);
    expect(point.latitude).toBe(51.5);
    expect(point.longitude).toBe(-0.15);
    const obj2 = { foo: 'bar' };
    expect(() => GeoPoint.fromObject(obj2)).toThrowError();
  });
});