import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with the correct message when coordinates are invalid', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [-0.15] as any });
    }).toThrow('coordinates must be an array and contain 2 elements');
  });
});