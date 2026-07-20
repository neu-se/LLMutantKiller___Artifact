import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is not true and done is provided', (done) => {
    const read = () => {
      return (abort, cb) => {
        if (abort) return cb(abort)
        cb(null, 1)
      }
    }
    const sink = drain(() => true, (err) => {
      if (err) {
        done.fail(err);
      } else {
        done(new Error('Expected error was not thrown'));
      }
    })
    sink(read())(null, () => {})
  });
});