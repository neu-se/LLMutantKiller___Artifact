import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when coordinates are an array with a length other than 2', () => {
    const point = {
      type: 'Point',
      coordinates: [1, 2, 3],
    };

    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError(
      'coordinates must be an array and contain 2 elements',
    );
  });
});