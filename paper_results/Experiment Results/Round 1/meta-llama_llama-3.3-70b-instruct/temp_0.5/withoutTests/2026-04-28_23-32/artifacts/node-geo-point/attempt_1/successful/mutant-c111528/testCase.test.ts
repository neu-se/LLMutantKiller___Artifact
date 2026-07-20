import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint class', () => {
  it('should throw a RangeError when longitude is less than -180', () => {
    expect(() => new GeoPoint(0, -190)).toThrow(RangeError);
  });
});