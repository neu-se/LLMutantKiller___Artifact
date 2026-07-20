import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject is called with a non-object', () => {
    expect(() => {
      GeoPoint.fromObject("not an object");
    }).toThrow(TypeError);
  });
});