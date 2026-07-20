import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when latitude is greater than 90', () => {
    expect(() => new GeoPoint(91, 0)).toThrow(RangeError);
  });
});