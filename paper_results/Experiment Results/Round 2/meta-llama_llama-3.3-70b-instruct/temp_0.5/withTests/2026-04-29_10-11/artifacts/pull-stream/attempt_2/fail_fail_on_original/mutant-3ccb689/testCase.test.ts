import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('async-map', () => {
  it('should abort when map errors', (done) => {
    const ERR = new Error('abort');
    const read = asyncMap(function (data: any, cb: (err: Error | null, data: any) => void) {
      cb(ERR);
    });
    read(null, function (end: any, data: any) {
      if (end) {
        done();
      } else {
        read(ERR, function (end: any, data: any) {
          if (end) {
            done();
          }
        });
      }
    });
  });
});