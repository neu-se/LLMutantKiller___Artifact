import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should pass through data when map function returns it', (done) => {
    const source = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });

    const read = source(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      } else if (data === 1) {
        done();
      }
    });

    read(null, (err: any, data: any) => {
      if (err) {
        done.fail('Error occurred');
      } else if (data === 1) {
        read(null, (err: any, data: any) => {
          if (err) {
            done.fail('Error occurred');
          }
        });
      }
    });
  });
});