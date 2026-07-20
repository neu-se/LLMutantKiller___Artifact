import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError(TypeError);
    consoleSpy.mockRestore();
    expect(GeoPoint.fromGeoJSON({ type: 'Point', coordinates: [1, 2] })).toBeInstanceOf(GeoPoint);
  });
});