import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError when point.type is not "Point"', () => {
    const invalidGeoJSON = {
      type: 'LineString',
      coordinates: [10, 20] as [number, number],
    };

    expect(() => {
      GeoPoint.fromGeoJSON(invalidGeoJSON as any);
    }).toThrow(TypeError);
  });
});