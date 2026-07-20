import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is not an object', () => {
    expect(() => {
      GeoPoint.fromObject("not an object" as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});