import { GeoPoint, Point } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is a boolean', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(true as unknown as Point);
    }).toThrow(TypeError);
  });
});