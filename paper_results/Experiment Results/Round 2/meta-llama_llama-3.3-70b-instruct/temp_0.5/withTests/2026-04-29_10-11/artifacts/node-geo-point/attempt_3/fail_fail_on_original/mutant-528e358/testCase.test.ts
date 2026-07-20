import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when longitude is out of range in the mutated code but not in the original code', () => {
    expect(() => new GeoPoint(0, 200)).toThrow(RangeError);
    expect(() => new GeoPoint(0, -200)).toThrow(RangeError);
  });
});