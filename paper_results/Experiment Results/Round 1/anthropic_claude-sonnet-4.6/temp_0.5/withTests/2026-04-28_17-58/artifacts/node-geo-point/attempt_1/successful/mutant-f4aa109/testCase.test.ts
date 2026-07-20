import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint latitude validation', () => {
  it('should throw a RangeError with message "bad latitude value" when latitude is out of range', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
    expect(() => new GeoPoint(91, 0)).toThrow('bad latitude value');
  });
});