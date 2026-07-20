import { GeoPoint, Point } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with a descriptive message when the input object lacks type and coordinates', () => {
    const invalidPoint: Partial<Point> = {};

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint as Point);
    }).toThrow(TypeError);

    try {
      GeoPoint.fromGeoJSON(invalidPoint as Point);
    } catch (error) {
      expect((error as TypeError).message).toBe('Object must have type and coordinates');
    }
  });
});