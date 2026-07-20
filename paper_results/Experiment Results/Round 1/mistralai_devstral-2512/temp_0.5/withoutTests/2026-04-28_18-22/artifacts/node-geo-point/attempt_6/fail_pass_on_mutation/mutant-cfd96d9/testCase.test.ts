import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject is called with an array', () => {
    expect(() => {
      GeoPoint.fromObject([1, 2]);
    }).toThrow(TypeError);
  });
});