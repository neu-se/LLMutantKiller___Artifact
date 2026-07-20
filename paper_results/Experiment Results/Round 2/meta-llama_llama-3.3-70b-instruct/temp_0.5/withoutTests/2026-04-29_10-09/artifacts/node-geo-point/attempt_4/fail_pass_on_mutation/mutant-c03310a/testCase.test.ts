import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a non-object', () => {
    const point = { type: 'Point', coordinates: [0, 0] };
    delete point.type;
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError(TypeError);
  });
});