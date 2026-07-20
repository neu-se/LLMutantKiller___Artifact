import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when fromGeoJSON is called with a boolean', () => {
    expect(() => {
      GeoPoint.fromGeoJSON(true as any);
    }).toThrow(TypeError);
  });
});