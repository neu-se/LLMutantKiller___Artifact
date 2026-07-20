import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should abort when aborted', (done) => {
    const read = asyncMap((data, cb) => {
      cb(null, data);
    });
    let ended = false;
    read(null, (end, data) => {
      if (end) {
        ended = true;
      }
    });
    read(true, (end, data) => {
      expect(end).toBe(true);
      expect(ended).toBe(true);
      done();
    });
  });
});