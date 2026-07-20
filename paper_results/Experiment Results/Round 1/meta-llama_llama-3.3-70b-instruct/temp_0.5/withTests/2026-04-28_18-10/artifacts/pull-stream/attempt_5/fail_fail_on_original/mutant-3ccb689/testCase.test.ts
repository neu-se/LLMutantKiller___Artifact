import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('asyncMap', () => {
  it('should abort when aborted', (done) => {
    const source = pull(
      pull.values([1, 2, 3]),
      pull.asyncMap((data, cb) => {
        cb(null, data);
      })
    );

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