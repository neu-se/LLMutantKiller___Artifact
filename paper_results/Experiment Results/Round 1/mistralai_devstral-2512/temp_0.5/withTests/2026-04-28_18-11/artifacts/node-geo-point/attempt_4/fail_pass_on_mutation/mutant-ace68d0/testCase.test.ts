import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives invalid object structure', () => {
    expect(() => {
      GeoPoint.fromObject({} as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({ latitude: 10 } as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject({ longitude: 20 } as any);
    }).toThrow(TypeError);
  });
});