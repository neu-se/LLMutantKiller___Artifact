import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with the correct message when coordinates array is invalid', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [1] as any });
    }).toThrow('coordinates must be an array and contain 2 elements');
  });
});