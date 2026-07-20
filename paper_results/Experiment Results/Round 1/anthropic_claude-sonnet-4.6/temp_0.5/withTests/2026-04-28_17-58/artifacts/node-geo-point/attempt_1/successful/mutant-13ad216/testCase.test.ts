import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError when the type property is not "Point"', () => {
    expect(() => {
      GeoPoint.fromGeoJSON({ type: 'LineString' as any, coordinates: [0, 0] });
    }).toThrow(TypeError);
  });
});