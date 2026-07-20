import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when object is missing type and coordinates properties', () => {
    const invalidPoint = {} as any;
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow('Object must have type and coordinates');
  });
});