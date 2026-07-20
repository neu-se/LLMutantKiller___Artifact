import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with correct message when a function is passed', () => {
    const fn = function() {};
    expect(() => {
      GeoPoint.fromObject(fn as any);
    }).toThrow('GeoPoint: Argument must be an object');
  });
});