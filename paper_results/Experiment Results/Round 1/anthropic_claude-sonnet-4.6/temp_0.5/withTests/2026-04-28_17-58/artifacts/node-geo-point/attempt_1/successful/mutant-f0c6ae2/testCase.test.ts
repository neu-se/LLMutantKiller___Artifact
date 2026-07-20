import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with the correct message when type is not Point', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'NotAPoint' as any, coordinates: [-0.15, 51.5] });
    }).toThrow("The value of type should be 'Point'");
  });
});