import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with the correct message when type is not Point', () => {
    const invalidGeoJSON = {
      type: 'LineString',
      coordinates: [10, 20]
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON as any);
    }).toThrow("The value of type should be 'Point'");
  });
});