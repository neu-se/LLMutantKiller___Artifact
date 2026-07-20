import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should abort when aborted', (done) => {
    const read = asyncMap((data: any, cb: (err: any, data: any) => void) => {
      cb(null, data);
    });

    let ended = false;
    read(null, (end: any, data: any) => {
      if (end) {
        ended = true;
      }
    });

    read(true, (end: any, data: any) => {
      if (end) {
        expect(end).toBe(true);
        expect(ended).toBe(false);
        done();
      }
    });
  });
});