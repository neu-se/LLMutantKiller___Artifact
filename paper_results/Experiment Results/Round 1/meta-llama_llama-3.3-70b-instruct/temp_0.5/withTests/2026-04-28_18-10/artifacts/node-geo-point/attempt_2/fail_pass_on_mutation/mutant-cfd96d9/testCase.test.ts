import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when null is passed to fromObject', () => {
    expect(() => GeoPoint.fromObject(null)).toThrowError(TypeError);
  });
});