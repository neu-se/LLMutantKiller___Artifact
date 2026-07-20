import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives a non-object with type and coordinates', () => {
    expect(() => {
      GeoPoint.fromGeoJSON("not an object");
    }).toThrow(TypeError);
  });
});