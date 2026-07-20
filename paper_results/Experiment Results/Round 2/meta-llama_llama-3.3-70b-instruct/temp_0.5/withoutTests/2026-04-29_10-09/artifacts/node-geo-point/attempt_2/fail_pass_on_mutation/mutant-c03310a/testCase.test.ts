import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    expect(() => GeoPoint.fromGeoJSON('not an object')).toThrowError(TypeError);
  });
});