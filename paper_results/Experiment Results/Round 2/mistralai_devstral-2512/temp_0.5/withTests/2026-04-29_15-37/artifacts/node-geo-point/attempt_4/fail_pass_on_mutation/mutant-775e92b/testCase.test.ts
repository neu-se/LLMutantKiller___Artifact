import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives a string', () => {
    expect(() => {
      GeoPoint.fromObject("invalid" as any);
    }).toThrow(TypeError);
  });
});