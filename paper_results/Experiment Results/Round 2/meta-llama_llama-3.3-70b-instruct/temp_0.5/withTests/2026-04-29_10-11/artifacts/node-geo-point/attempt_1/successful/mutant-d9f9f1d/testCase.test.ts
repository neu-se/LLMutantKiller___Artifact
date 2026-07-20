import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object with only one of latitude or longitude properties', () => {
    expect(() => GeoPoint.fromObject({ latitude: 51.5 })).toThrowError('Object must have latitude and longitude');
    expect(() => GeoPoint.fromObject({ longitude: -0.15 })).toThrowError('Object must have latitude and longitude');
  });
});