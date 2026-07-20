import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should create an instance from object', () => {
    const object = {
      latitude: 51.5,
      longitude: -0.15
    };
    const gp1 = GeoPoint.fromObject(object);
    expect(gp1.toObject()).toEqual(object);
  });
});