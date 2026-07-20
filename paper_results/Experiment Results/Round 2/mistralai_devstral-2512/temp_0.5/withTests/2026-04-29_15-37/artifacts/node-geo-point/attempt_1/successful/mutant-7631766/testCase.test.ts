import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object is missing latitude or longitude properties', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 51.5 });
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({ longitude: -0.15 });
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({});
    }).toThrow(TypeError);
  });
});