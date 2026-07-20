import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should abort when aborted', (done) => {
    const source = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });

    let called = false;
    source(null, (err: any) => {
      called = true;
    });

    source(true, (err: any) => {
      if (called) {
        throw new Error('should not be called');
      }
      done();
    });
  });
});