import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates is not an array with exactly 2 elements', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({
        type: 'Point',
        coordinates: [1, 2, 3]
      });
    }).toThrow(TypeError);
  });
});