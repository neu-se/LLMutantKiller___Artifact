import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError when the type property is not Point', () => {
    const invalidGeoJSON = {
      type: 'LineString' as any,
      coordinates: [10, 20] as any,
    };

    expect(() => GeoPoint.fromGeoJSON(invalidGeoJSON)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(invalidGeoJSON)).toThrow("The value of type should be 'Point'");
  });
});