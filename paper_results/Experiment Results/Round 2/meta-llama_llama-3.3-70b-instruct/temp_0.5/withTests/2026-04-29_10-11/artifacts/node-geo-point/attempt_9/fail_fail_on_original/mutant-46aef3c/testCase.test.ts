import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint with an invalid longitude in the mutated code', () => {
    const longitude = 181;
    expect(() => new GeoPoint(0, longitude)).toThrow(RangeError);
  });
});