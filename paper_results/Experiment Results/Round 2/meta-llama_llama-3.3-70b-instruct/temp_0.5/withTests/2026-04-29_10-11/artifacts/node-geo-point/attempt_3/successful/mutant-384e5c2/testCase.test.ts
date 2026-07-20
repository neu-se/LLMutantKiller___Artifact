import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with incorrect type', () => {
    expect(() => GeoPoint.fromGeoJSON({
      type: 'Point',
      coordinates: [-0.15, 51.5]
    })).not.toThrowError();

    expect(() => GeoPoint.fromGeoJSON({
      type: 'LineString',
      coordinates: [-0.15, 51.5]
    })).toThrowError('The value of type should be \'Point\'');
  });
});