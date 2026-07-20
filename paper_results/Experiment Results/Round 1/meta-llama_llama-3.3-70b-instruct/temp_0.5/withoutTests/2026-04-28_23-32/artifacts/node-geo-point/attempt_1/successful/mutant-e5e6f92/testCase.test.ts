import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw TypeError when creating a GeoPoint from a GeoJSON object without type and coordinates properties', () => {
    const point = { foo: 'bar' };
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrow('Object must have type and coordinates');
  });
});