import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without a type or coordinates property', () => {
    const point = { foo: 'bar' };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('Object must have type and coordinates');
  });
});