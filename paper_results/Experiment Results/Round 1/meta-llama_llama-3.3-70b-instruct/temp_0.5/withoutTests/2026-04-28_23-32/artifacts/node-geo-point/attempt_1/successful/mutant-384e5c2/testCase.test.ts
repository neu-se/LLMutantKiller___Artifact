import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const invalidPoint = {
      type: 'LineString',
      coordinates: [12.5, 34.2],
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint as any)).toThrowError('The value of type should be \'Point\'');
  });
});