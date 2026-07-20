import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point has neither type nor coordinates', () => {
    const invalidPoint = {};

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow(TypeError);
  });
});