import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw a meaningful error when creating from object without latitude and longitude', () => {
    expect(() => GeoPoint.fromObject({})).toThrowError('Object must have latitude and longitude');
  });
});