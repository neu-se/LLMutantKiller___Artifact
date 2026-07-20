import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when latitude is less than -90', () => {
    expect(() => new GeoPoint(-91, 0)).toThrow(RangeError);
  });
});