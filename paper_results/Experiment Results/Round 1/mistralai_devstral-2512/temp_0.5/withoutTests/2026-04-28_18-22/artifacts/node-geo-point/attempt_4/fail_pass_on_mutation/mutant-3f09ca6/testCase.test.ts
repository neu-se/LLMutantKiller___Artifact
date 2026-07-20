import { GeoPoint, Point } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is not an object', () => {
    const invalidInput = 123;
    expect(() => {
      GeoPoint.fromGeoJSON(invalidInput as unknown as Point);
    }).toThrow(TypeError);
  });
});