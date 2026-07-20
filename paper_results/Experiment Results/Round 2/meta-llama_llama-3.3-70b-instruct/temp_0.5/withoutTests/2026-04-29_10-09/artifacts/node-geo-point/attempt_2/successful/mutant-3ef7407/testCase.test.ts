import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with a type but no coordinates property', () => {
    const point = { type: 'Point' };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('Object must have type and coordinates');
  });
});