import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object without type and coordinates properties', () => {
    const point = { type: 'Point', coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrowError();

    const pointWithoutType = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(pointWithoutType)).toThrowError('Object must have type and coordinates');

    const pointWithoutCoordinates = { type: 'Point' };
    expect(() => GeoPoint.fromGeoJSON(pointWithoutCoordinates)).toThrowError('Object must have type and coordinates');
  });
});