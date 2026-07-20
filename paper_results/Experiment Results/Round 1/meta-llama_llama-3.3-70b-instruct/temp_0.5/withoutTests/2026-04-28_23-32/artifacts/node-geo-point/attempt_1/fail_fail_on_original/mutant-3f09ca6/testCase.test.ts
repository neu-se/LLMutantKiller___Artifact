import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid GeoJSON', () => {
    expect(() => GeoPoint.fromGeoJSON({})).toThrowError('Object must have type and coordinates');
  });
});