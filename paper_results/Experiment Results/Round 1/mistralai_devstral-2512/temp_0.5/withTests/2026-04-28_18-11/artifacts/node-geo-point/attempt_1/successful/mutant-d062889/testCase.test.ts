import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw a TypeError with a descriptive message when the input is not an object', () => {
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});