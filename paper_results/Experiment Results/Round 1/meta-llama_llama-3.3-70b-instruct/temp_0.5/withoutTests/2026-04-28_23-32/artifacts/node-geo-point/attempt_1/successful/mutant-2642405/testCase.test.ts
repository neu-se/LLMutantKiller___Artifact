import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a TypeError with a specific message when creating a GeoPoint from a GeoJSON object without type and coordinates', () => {
    const point = {};
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('Object must have type and coordinates');
  });
});