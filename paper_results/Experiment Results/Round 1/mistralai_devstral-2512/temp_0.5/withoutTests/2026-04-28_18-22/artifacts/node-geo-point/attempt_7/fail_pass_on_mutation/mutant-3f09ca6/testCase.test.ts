import { GeoPoint, Point } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is an array', () => {
    expect(() => {
      GeoPoint.fromGeoJSON([1, 2] as unknown as Point);
    }).toThrow(TypeError);
  });
});