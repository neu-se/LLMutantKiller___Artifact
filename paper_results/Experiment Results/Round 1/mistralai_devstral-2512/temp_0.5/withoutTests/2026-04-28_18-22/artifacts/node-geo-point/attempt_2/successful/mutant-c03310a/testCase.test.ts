import { GeoPoint, Point } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError with specific message when input is not an object', () => {
    const invalidInput = "not an object";
    expect(() => {
      GeoPoint.fromGeoJSON(invalidInput as unknown as Point);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});