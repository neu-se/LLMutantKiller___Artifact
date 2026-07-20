import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw TypeError when creating GeoPoint from invalid object', () => {
    expect(() => GeoPoint.fromObject({ type: 'Point', coordinates: [1, 2] })).toThrow(TypeError);
  });
});