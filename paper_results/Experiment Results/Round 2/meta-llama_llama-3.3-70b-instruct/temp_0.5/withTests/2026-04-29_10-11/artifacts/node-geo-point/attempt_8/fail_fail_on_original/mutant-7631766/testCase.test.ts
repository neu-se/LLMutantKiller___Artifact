import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object without both latitude and longitude in the mutated code', () => {
    const obj = { latitude: 51.5, longitude: -0.15 };
    const point = GeoPoint.fromObject(obj);
    expect(point.latitude).toBe(51.5);
    expect(point.longitude).toBe(-0.15);
    expect(() => GeoPoint.fromObject({})).toThrowError('Object must have latitude and longitude');
  });
});