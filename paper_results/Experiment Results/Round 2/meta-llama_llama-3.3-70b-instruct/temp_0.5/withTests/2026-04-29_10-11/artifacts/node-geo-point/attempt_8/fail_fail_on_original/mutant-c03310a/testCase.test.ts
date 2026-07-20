import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with a non-object argument', () => {
    const point = null;
    expect(() => GeoPoint.fromGeoJSON(point)).toThrow();
  });
});