import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with correct message when a non-object is passed', () => {
    expect(() => {
      GeoPoint.fromObject('not an object' as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});