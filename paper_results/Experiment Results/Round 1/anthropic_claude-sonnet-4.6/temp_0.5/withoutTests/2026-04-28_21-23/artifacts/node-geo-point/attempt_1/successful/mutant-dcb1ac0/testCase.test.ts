import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array has more than 2 elements', () => {
    const invalidPoint = {
      type: 'Point' as const,
      coordinates: [1, 2, 3] as any,
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
  });
});