import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw a TypeError with the correct message when argument is not an object', () => {
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(new TypeError('GeoPoint: Argument must be an object'));
  });
});