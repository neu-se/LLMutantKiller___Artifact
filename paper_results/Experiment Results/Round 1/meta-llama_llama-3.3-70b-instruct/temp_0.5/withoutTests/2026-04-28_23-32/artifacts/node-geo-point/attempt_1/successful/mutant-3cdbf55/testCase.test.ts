import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when longitude is not a number', () => {
    expect(() => new GeoPoint(0, 'a' as any)).toThrow(RangeError);
  });
});