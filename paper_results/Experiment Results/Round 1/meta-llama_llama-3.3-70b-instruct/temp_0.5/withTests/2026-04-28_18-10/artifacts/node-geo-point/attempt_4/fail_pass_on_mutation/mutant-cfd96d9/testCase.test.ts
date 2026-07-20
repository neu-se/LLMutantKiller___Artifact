import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when a primitive is passed to fromObject', () => {
    expect(() => GeoPoint.fromObject(123)).toThrowError(TypeError);
  });
});