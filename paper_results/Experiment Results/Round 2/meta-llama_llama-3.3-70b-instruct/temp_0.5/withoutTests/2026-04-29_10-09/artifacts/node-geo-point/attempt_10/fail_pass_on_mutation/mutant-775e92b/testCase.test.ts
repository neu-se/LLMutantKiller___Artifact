import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should correctly handle the isObject function', () => {
    const obj = {};
    obj.latitude = 0;
    obj.longitude = 0;
    expect(() => GeoPoint.fromObject(obj)).not.toThrowError();
    const notObj = Object.create(null);
    notObj.latitude = 0;
    notObj.longitude = 0;
    expect(() => GeoPoint.fromObject(notObj)).toThrowError(TypeError);
  });
});