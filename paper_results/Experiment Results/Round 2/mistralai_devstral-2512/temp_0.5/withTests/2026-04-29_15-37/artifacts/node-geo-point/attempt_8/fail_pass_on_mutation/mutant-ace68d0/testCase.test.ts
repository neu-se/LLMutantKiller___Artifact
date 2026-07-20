import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives a number input', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(42 as any);
    }).toThrow(TypeError);
  });
});