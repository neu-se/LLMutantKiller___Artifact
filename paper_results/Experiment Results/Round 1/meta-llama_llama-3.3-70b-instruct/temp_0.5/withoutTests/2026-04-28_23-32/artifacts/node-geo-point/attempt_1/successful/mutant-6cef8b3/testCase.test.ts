import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when the latitude is not a number', () => {
    expect(() => new GeoPoint('a', 0)).toThrow(RangeError);
  });
});