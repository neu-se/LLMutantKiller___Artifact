import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with descriptive message when coordinates or type property is missing', () => {
    const invalidPoint = { coordinates: [0, 0] };
    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    }).toThrow(TypeError);
    try {
      GeoPoint.fromGeoJSON(invalidPoint as any);
    } catch (error: any) {
      expect(error.message).not.toBe("");
      expect(error.message).toContain("type");
    }
  });
});