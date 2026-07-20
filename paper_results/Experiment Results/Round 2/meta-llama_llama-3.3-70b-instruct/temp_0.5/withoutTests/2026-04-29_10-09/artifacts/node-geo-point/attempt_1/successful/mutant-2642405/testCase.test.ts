import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a TypeError with a descriptive message when creating a GeoPoint from a GeoJSON object without type and coordinates', () => {
    const point = {
      foo: 'bar',
    };

    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('Object must have type and coordinates');
  });
});