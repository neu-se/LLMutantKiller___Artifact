import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives null', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(null);
    }).toThrow(TypeError);
  });
});