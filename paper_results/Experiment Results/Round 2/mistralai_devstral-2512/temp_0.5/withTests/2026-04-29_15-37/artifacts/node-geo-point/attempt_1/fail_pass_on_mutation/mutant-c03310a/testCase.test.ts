import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is not an object', () => {
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