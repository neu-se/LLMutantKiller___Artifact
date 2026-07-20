import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array has wrong length', () => {
    const invalidPoint = {
      type: 'Point' as const,
      coordinates: [10] as any,
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
  });
});