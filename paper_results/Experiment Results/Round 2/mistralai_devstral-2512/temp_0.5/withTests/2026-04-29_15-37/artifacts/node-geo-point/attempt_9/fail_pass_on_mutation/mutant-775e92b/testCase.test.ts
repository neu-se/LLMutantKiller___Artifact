import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives undefined', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(undefined as any);
    }).toThrow(TypeError);
  });
});