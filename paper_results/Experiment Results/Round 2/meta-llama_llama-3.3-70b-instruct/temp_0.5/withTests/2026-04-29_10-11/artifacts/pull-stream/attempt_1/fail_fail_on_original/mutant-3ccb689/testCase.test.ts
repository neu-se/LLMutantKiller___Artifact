import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('async-map', () => {
  it('should abort when map errors', (done) => {
    const ERR = new Error('abort');
    const read = asyncMap(function (data, cb) {
      cb(ERR);
    });
    read(null, function (end, data) {
      if (end) {
        done();
      } else {
        read(ERR, function (end, data) {
          if (end) {
            done();
          }
        });
      }
    });
  });
});