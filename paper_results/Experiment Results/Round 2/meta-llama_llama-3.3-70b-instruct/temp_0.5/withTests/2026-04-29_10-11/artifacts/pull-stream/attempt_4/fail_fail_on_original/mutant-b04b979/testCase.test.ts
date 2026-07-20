import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should handle identity function correctly', (done) => {
    const source = asyncMap(function (data: any, cb: (err: any, data: any) => void) {
      cb(null, data);
    });

    const read = source(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      }
    });

    read(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      } else {
        expect(data).toBeUndefined();
        done();
      }
    });
  });
});