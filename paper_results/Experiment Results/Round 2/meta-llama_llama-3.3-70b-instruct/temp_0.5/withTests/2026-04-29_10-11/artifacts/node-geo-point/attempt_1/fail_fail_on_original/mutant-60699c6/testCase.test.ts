import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw a RangeError with a message when creating a GeoPoint with non-numeric arguments', () => {
    expect(() => new GeoPoint('a' as any, 2)).toThrow(RangeError);
    expect(() => new GeoPoint(1, 'b' as any)).toThrow(RangeError);
    const error1 = new GeoPoint('a' as any, 2);
    const error2 = new GeoPoint(1, 'b' as any);
    expect(error1).toBeInstanceOf(GeoPoint);
    expect(error2).toBeInstanceOf(GeoPoint);
  });
});