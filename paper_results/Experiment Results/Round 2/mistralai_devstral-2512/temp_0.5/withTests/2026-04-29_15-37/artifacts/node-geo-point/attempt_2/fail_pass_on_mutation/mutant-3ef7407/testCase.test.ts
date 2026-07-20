import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON validation', () => {
  it('should throw TypeError when GeoJSON point has coordinates but missing type', () => {
    const invalidPoint = {
      coordinates: [-0.15, 51.5]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow(TypeError);
  });
});