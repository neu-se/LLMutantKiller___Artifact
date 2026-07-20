import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object is missing latitude or longitude properties', () => {
    expect(() => {
      GeoPoint.fromObject({ latitude: 40 });
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({ longitude: -74 });
    }).toThrow(TypeError);
  });
});