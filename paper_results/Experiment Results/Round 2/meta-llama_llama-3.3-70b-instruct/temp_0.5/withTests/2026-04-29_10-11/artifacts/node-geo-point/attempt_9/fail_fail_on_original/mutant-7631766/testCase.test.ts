import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const obj = { latitude: 51.5, longitude: -0.15 };
    const point = GeoPoint.fromObject(obj);
    expect(point.latitude).toBe(51.5);
    expect(point.longitude).toBe(-0.15);
    // The mutated code will not throw an error here, but the original code will
    const obj2 = { latitude: 51.5 };
    expect(() => GeoPoint.fromObject(obj2)).toThrowError();
  });
});