import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives an array', () => {
    expect(() => {
      GeoPoint.fromObject([1, 2] as any);
    }).toThrow(TypeError);
  });
});