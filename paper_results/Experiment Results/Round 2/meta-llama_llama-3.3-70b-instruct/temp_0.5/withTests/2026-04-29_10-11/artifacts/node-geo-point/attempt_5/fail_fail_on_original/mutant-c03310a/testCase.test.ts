import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with a non-object argument', () => {
    expect(() => GeoPoint.fromGeoJSON({})).toThrow();
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow();
    expect(() => GeoPoint.fromGeoJSON(undefined)).toThrow();
  });
});