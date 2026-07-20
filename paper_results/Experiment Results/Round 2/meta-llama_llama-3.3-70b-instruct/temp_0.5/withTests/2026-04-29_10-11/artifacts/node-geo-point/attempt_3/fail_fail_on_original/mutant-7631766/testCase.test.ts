import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from an object with latitude but no longitude', () => {
    expect(() => GeoPoint.fromObject({ latitude: 51.5 })).toThrowError('Object must have latitude and longitude');
  });
});