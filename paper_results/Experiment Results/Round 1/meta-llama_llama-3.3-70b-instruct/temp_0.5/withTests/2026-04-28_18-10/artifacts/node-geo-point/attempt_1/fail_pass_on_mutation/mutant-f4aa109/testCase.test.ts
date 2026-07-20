import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when the latitude is out of range', () => {
    expect(() => new GeoPoint(-91, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
  });
});