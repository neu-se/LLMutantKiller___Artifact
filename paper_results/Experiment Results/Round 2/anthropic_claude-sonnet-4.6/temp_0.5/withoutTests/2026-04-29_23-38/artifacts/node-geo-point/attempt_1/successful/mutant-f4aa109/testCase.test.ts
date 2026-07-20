import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor latitude validation', () => {
  it('should throw a RangeError with message "bad latitude value" when latitude is out of range', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(new RangeError('bad latitude value'));
  });
});