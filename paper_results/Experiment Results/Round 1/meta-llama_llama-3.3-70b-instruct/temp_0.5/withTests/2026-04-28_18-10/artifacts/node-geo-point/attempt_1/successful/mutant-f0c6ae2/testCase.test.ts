import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a GeoPoint from GeoJSON with an invalid type', () => {
    const geoJson = {
      type: 'InvalidType',
      coordinates: [-0.15, 51.5]
    };

    expect(() => GeoPoint.fromGeoJSON(geoJson)).toThrowError('The value of type should be \'Point\'');
  });
});