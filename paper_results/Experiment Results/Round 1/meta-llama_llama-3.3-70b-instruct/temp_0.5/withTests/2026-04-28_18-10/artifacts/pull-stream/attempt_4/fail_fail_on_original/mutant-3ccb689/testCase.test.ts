import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should abort when aborted', (done) => {
    const source = asyncMap((data, cb) => {
      cb(null, data);
    });

    let ended = false;
    source(null, (end, data) => {
      if (end) {
        ended = true;
      }
    });

    source(true, (end, data) => {
      expect(end).toBe(true);
      expect(ended).toBe(false);
      done();
    });
  });
});