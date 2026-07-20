import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('pull-stream drain', () => {
  it('should handle end correctly', (done) => {
    const source = () => {
      let i = 0;
      return (end, cb) => {
        if (end) return cb(end);
        if (i < 5) {
          cb(null, i++);
        } else {
          cb(true);
        }
      };
    };

    const sink = drain(
      (data) => {
        // do nothing
      },
      (err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      }
    );

    pull(
      source(),
      sink
    );
  });
});