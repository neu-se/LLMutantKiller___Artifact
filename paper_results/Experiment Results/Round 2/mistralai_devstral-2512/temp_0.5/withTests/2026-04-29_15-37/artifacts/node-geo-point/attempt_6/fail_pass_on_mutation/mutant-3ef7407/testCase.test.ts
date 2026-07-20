import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON validation', () => {
  it('should throw TypeError when GeoJSON point has neither type nor coordinates', () => {
    const invalidPoint = {};

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow(TypeError);
  });
});