import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when object has neither latitude nor longitude', () => {
    expect(() => GeoPoint.fromObject({})).toThrow('Object must have latitude and longitude');
  });
});