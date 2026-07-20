import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is not an object', () => {
    expect(() => {
      GeoPoint.fromGeoJSON("invalid");
    }).toThrow(TypeError);
  });
});