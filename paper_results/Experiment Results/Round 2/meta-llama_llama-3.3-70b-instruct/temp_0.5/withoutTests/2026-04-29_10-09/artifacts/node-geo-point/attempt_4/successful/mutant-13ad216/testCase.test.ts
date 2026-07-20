import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const invalidPoint = { type: 'Point', coordinates: [1, 2] };
    const invalidTypePoint = { type: 'LineString', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(invalidTypePoint)).toThrow();
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).not.toThrow();
  });
});