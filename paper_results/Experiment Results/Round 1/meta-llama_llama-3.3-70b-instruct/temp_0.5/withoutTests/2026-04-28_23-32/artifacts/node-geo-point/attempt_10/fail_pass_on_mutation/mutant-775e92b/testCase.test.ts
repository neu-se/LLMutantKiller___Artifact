import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an invalid object', () => {
    const obj = {};
    obj.__proto__ = null;
    expect(() => GeoPoint.fromObject(obj)).toThrowError(TypeError);
  });
});