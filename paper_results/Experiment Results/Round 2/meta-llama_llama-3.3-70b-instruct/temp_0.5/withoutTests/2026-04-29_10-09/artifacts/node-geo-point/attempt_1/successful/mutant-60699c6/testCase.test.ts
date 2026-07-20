import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a RangeError with a meaningful message when invalid arguments are passed to the constructor', () => {
    expect(() => new GeoPoint('a' as any, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(0, 'a' as any)).toThrow(RangeError);
    const error = new Error();
    try {
      new GeoPoint('a' as any, 0);
    } catch (e) {
      error.message = e.message;
    }
    expect(error.message).not.toBe('');
  });
});