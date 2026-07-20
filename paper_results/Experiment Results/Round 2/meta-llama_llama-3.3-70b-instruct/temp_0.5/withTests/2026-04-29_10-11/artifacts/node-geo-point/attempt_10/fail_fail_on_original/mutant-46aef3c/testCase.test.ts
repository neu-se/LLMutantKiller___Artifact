import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint with a valid longitude', () => {
    const longitude = 180;
    expect(() => new GeoPoint(0, longitude)).not.toThrow();
    const invalidLongitude = 181;
    expect(() => new GeoPoint(0, invalidLongitude)).toThrow(RangeError);
  });
});