import { GeoPoint } from '../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a new instance with invalid arguments', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrowError('Bad geo point arguments');
  });
});