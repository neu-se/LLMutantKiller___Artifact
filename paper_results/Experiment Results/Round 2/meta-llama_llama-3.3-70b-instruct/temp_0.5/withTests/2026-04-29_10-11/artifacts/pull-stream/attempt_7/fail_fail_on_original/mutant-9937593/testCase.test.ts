import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('drain', () => {
  it('should call done with error when end is not true and done is provided', (done) => {
    values([1, 2, 3])(
      drain((data) => {
        if (data === 2) {
          throw new Error('Test error');
        }
      }, (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Expected error was not thrown'));
        }
      })
    );
  });
});