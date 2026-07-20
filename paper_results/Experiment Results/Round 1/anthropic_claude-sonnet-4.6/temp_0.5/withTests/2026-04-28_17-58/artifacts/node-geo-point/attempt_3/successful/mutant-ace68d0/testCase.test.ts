import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when a function with latitude and longitude properties is passed', () => {
    const fn: any = function() {};
    fn.latitude = 10;
    fn.longitude = 20;

    expect(() => {
      GeoPoint.fromObject(fn);
    }).toThrow(TypeError);
  });
});