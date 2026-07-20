import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with incorrect type', () => {
    const geoJson = {
      type: 'LineString',
      coordinates: [-0.15, 51.5]
    };

    expect(() => GeoPoint.fromGeoJSON(geoJson)).toThrowError('The value of type should be \'Point\'');
  });
});