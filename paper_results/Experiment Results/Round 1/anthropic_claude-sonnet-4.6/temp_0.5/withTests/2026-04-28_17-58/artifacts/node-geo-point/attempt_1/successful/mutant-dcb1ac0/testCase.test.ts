import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when coordinates array does not contain exactly 2 elements', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({
        type: 'Point',
        coordinates: [-0.15, 51.5, 100] as any,
      });
    }).toThrow(TypeError);
  });
});