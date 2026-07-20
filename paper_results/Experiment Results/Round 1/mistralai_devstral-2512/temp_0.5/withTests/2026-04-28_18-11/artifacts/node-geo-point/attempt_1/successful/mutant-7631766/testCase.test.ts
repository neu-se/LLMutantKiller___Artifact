import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when object lacks required properties', () => {
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