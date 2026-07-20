import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when input is undefined', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(undefined as any);
    }).toThrow(TypeError);
  });
});