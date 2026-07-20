import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with message about argument being an object when a number is passed', () => {
    expect(() => {
      GeoPoint.fromObject(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});