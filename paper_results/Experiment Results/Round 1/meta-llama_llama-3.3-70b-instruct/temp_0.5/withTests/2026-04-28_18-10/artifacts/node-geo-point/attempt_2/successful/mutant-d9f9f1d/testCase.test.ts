import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when object has only latitude', () => {
    expect(() => GeoPoint.fromObject({ latitude: 10 })).toThrow('Object must have latitude and longitude');
  });
});