import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON validation', () => {
  it('should throw TypeError when GeoJSON point has type but missing coordinates', () => {
    const invalidPoint = {
      type: 'Point'
      // Missing coordinates property
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow(TypeError);
  });
});