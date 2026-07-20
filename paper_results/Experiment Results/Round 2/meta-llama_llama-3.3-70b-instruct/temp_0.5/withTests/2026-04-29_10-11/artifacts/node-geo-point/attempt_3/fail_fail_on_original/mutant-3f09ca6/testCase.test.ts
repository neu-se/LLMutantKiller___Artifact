import { GeoPoint } from "./../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint from a valid GeoJSON object', () => {
    const point = { type: 'Point', coordinates: [1.0, 2.0] };
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
  });
});