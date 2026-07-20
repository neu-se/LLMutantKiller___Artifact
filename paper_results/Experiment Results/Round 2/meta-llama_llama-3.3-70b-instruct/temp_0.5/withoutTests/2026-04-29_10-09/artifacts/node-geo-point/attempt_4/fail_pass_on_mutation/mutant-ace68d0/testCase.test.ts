import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from object without latitude and longitude', () => {
    expect(() => GeoPoint.fromObject({ foo: 'bar' })).toThrow(TypeError);
  });
});