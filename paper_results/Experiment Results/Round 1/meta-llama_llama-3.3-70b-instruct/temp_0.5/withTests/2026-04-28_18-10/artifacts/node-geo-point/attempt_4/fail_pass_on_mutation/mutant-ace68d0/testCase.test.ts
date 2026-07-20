import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object using fromObject', () => {
    expect(() => GeoPoint.fromObject('string')).toThrow(TypeError);
    expect(() => GeoPoint.fromObject(123)).toThrow(TypeError);
    expect(() => GeoPoint.fromObject(true)).toThrow(TypeError);
  });
});