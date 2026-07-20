import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array does not have exactly 2 elements', () => {
    const invalidPoint = {
      type: 'Point' as const,
      coordinates: [1, 2, 3] as any,
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow('coordinates must be an array and contain 2 elements');
  });
});