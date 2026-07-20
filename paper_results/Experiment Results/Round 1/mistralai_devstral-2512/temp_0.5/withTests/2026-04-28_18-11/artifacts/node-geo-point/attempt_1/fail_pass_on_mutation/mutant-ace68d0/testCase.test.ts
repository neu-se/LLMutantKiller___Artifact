import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromGeoJSON receives non-object input', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(null as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON(undefined as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON("invalid" as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON(123 as any);
    }).toThrow(TypeError);
  });
});