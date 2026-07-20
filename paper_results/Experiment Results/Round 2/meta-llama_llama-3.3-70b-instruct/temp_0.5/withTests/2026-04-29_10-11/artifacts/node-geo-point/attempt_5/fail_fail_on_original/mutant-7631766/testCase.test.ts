import { GeoPoint } from "../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create a GeoPoint from an object with latitude and longitude', () => {
    const point = GeoPoint.fromObject({ latitude: 51.5, longitude: -0.15 });
    expect(point.latitude).toBe(51.5);
    expect(point.longitude).toBe(-0.15);
  });

  it('should not create a GeoPoint from an object without latitude and longitude in the mutated code', () => {
    const obj = { foo: 'bar' };
    expect(() => GeoPoint.fromObject(obj)).toThrowError();
  });
});