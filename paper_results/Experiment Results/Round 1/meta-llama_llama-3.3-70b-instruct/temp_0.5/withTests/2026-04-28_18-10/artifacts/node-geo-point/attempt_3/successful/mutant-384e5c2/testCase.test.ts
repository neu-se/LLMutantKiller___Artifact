import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint tests', () => {
  it('should throw an error when type is not Point', () => {
    expect(() => GeoPoint.fromGeoJSON({
      type: 'LineString',
      coordinates: [-0.15, 51.5]
    })).toThrowError('The value of type should be \'Point\'');
  });
});