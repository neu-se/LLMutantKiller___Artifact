import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint fromGeoJSON with invalid type', () => {
    expect(() => GeoPoint.fromGeoJSON({ type: 'LineString', coordinates: [1, 2] })).toThrow(TypeError);
  });
});