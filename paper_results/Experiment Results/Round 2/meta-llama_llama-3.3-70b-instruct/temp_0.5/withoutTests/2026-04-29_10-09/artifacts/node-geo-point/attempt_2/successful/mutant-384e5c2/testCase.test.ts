import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON with incorrect type', () => {
    const point = {
      type: 'NotAPoint',
      coordinates: [10.0, 20.0],
    };

    expect(() => GeoPoint.fromGeoJSON(point as any)).toThrowError('The value of type should be \'Point\'');
  });
});