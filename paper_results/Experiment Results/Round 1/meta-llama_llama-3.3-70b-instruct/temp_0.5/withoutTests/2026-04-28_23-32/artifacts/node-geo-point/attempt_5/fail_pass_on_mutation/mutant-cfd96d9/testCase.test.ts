import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from null object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({})).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject({ latitude: 0, longitude: 0 })).not.toThrowError(TypeError);
    expect(() => GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [0, 0] })).not.toThrowError(TypeError);
    try {
      GeoPoint.fromObject(null);
    } catch (error) {
      expect(error.name).toBe('TypeError');
    }
    try {
      GeoPoint.fromGeoJSON(null);
    } catch (error) {
      expect(error.name).toBe('TypeError');
    }
  });
});