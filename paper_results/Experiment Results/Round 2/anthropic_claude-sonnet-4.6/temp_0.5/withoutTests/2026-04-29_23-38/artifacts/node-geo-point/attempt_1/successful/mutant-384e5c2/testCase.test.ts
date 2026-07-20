import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when point type is not Point', () => {
    const invalidGeoJSON = {
      type: 'LineString' as any,
      coordinates: [10, 20] as [number, number],
    };

    expect(() => GeoPoint.fromGeoJSON(invalidGeoJSON)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(invalidGeoJSON)).toThrow("The value of type should be 'Point'");
  });
});