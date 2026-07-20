import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when fromGeoJSON is called with an array', () => {
    expect(() => {
      GeoPoint.fromGeoJSON([42, 24]);
    }).toThrow(TypeError);
  });
});