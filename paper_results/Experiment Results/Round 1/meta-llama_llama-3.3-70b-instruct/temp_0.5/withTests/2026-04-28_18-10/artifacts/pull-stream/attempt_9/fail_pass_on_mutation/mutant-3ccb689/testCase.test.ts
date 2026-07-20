import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should abort when aborted', () => {
    const source = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });

    source(null, (err: any) => {
      if (err) {
        throw new Error('should not be called');
      }
    });

    source(true, (err: any) => {
      if (err) {
        throw new Error('should not be called');
      }
    });
  });
});