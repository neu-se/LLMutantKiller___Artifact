import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw error when creating from invalid object', () => {
    const object = null;
    expect(() => GeoPoint.fromObject(object)).toThrowError('GeoPoint: Argument must be an object');
  });
});