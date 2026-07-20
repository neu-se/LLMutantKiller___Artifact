import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is not true and done is provided', (done) => {
    values([1, 2, 3])(
      drain(() => true, (err) => {
        if (err) {
          done.fail(err);
        } else {
          done(new Error('Expected error was not thrown'));
        }
      })
    );
  });
});