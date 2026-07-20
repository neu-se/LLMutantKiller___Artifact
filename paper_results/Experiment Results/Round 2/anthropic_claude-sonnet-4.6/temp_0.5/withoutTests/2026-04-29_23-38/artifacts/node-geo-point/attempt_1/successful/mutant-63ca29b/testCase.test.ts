import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError when coordinates array does not have exactly 2 elements', () => {
    const invalidPoint = {
      type: 'Point' as const,
      coordinates: [10, 20, 30] as any,
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
  });
});