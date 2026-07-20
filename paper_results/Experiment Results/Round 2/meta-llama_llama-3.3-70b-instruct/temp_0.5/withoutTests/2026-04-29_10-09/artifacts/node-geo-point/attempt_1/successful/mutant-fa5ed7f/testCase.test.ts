import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when coordinates are not an array or do not contain 2 elements', () => {
    const point = {
      type: 'Point',
      coordinates: 'not an array',
    };

    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});