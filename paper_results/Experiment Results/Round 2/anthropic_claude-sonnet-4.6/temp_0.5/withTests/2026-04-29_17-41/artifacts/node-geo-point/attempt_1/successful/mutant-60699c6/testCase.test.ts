import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor error message', () => {
  it('should throw a RangeError with message "Bad geo point arguments" when non-number arguments are provided', () => {
    expect(() => {
      new GeoPoint('not a number' as any, 0);
    }).toThrow(expect.objectContaining({
      constructor: RangeError,
      message: 'Bad geo point arguments',
    }));
  });
});