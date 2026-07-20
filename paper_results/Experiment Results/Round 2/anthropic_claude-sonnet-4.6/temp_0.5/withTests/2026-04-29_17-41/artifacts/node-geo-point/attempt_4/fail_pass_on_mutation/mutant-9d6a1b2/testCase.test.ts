import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should exist as a static method and return a GeoPoint instance', () => {
    expect(typeof GeoPoint.fromObject).toBe('function');
  });
});