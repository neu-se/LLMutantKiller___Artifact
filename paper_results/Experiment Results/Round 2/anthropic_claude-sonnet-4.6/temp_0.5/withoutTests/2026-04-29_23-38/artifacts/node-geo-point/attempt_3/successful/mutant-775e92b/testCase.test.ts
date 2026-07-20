import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromGeoJSON', () => {
  it('should throw TypeError when a non-object with valid-looking properties is passed', () => {
    // Create a function (non-object per typeof check) that has the required properties
    const fakePoint: any = function() {};
    fakePoint.type = 'Point';
    fakePoint.coordinates = [10, 20];

    // Original: isObject(fakePoint) => typeof fakePoint === 'object' => false (functions are 'function') => throws
    // Mutant: isObject(fakePoint) => true && fakePoint !== null => true => proceeds and returns a GeoPoint
    expect(() => {
      GeoPoint.fromGeoJSON(fakePoint);
    }).toThrow(TypeError);
  });
});