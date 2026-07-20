import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a meaningful error when creating a GeoPoint from an object with a non-object argument', () => {
    const errorMessage = 'GeoPoint: Argument must be an object';
    expect(() => GeoPoint.fromObject('string')).toThrowError(TypeError);
    expect(() => GeoPoint.fromObject('string')).toThrowError(errorMessage);
  });
});