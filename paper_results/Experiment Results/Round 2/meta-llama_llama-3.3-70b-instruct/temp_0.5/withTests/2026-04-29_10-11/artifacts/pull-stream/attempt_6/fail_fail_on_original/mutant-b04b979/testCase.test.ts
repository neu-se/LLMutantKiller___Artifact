import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should return the identity function when no map function is provided', (done) => {
    const source = asyncMap(null);
    const read = source(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      } else {
        expect(data).toBeUndefined();
        done();
      }
    });
    read(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      }
    });
  });
});