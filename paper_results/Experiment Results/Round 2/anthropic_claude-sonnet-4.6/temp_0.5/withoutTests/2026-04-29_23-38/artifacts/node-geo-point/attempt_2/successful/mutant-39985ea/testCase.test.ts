import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError with message when a non-object argument is passed', () => {
    expect(() => {
      GeoPoint.fromObject("not an object" as any);
    }).toThrow(new TypeError('GeoPoint: Argument must be an object'));
  });
});