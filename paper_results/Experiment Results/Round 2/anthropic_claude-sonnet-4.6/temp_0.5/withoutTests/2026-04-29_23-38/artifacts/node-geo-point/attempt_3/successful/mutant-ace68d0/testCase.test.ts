import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with specific message when argument is a number', () => {
    expect(() => {
      GeoPoint.fromObject(42 as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});