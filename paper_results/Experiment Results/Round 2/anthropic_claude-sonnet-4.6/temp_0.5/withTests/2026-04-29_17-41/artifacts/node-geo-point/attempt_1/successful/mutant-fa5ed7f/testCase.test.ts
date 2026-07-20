import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with a descriptive message when coordinates array does not have 2 elements', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({
        type: 'Point',
        coordinates: [1] as any,
      });
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromGeoJSON({
        type: 'Point',
        coordinates: [1] as any,
      });
    }).toThrow('coordinates must be an array and contain 2 elements');
  });
});