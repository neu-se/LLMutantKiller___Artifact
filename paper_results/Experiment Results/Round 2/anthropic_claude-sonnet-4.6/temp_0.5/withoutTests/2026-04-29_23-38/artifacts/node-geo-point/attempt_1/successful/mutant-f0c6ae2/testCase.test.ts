import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with the correct message when type is not Point', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'LineString' as any, coordinates: [0, 0] });
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'LineString' as any, coordinates: [0, 0] });
    }).toThrow("The value of type should be 'Point'");
  });
});