import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives a boolean', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(true as any);
    }).toThrow(TypeError);
  });
});