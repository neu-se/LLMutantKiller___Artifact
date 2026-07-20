import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array does not contain exactly 2 elements', () => {
    const invalidPoint = {
      type: 'Point',
      coordinates: [1, 2, 3] // 3 elements instead of 2
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidPoint);
    }).toThrow(TypeError);
  });
});