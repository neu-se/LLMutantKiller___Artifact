import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw a TypeError with message "Object must have type and coordinates" when object is missing type or coordinates', () => {
    const invalidPoint = { type: 'Point' } as any; // missing coordinates

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrow('Object must have type and coordinates');
  });
});