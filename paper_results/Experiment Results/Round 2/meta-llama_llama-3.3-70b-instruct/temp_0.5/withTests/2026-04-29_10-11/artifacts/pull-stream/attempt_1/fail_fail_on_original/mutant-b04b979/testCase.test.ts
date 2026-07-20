import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should pass error when map function throws an error', (done) => {
    const source = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      if (data === 1) {
        cb(new Error('Test error'));
      } else {
        cb(null, data);
      }
    });

    const read = source(null, (err: any, data: any) => {
      if (err) {
        done();
      }
    });

    read(null, (err: any, data: any) => {
      if (data === 1) {
        throw new Error('Expected error');
      }
    });
  });
});