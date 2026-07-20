import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint class', () => {
  it('should throw an error when creating a new GeoPoint from an invalid object', () => {
    const object = 'invalid';
    expect(() => GeoPoint.fromObject(object)).toThrowError('GeoPoint: Argument must be an object');
  });
});