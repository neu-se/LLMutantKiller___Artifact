import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow(TypeError);
  });
});