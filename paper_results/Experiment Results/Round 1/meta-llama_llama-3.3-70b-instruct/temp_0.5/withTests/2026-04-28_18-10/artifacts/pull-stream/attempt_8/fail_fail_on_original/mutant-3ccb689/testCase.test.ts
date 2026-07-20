import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should abort when aborted', (done) => {
    const source = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });

    source(null, (end: any) => {
      if (end) {
        done();
      } else {
        source(true, (end: any) => {
          if (end) {
            done();
          }
        });
      }
    });
  });
});