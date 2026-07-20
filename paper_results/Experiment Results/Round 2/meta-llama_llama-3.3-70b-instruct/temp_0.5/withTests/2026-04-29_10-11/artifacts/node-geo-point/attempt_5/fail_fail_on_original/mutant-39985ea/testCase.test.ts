import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating from object with missing properties in the mutated code', () => {
    const object = { latitude: 51.5 };
    expect(() => GeoPoint.fromObject(object)).not.toThrowError('Object must have latitude and longitude');
  });
});