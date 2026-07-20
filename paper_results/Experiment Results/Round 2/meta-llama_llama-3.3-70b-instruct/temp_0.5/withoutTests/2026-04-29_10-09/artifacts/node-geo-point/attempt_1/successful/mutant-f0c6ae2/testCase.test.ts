import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error with a descriptive message when creating a GeoPoint from GeoJSON with an invalid type', () => {
    const point = {
      type: 'LineString',
      coordinates: [
        [1, 2],
        [3, 4],
      ],
    };

    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('The value of type should be \'Point\'');
  });
});