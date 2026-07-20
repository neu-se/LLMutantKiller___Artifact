import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object that is not an object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
  });
});