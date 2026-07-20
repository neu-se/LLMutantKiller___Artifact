import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    const point = { type: 'Point', coordinates: [1.0, 2.0] };
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();
    expect(() => GeoPoint.fromGeoJSON(null)).toThrowError('GeoPoint: Argument must be an object');
  });
});