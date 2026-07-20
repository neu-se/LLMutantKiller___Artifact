import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives an array input', () => {
    expect(() => {
      GeoPoint.fromGeoJSON([1, 2] as any);
    }).toThrow(TypeError);
  });
});