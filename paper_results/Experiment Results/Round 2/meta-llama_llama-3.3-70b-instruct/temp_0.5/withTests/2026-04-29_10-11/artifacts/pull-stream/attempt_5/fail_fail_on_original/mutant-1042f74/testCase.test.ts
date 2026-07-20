import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('drain', () => {
  it('should handle asynchronous streams correctly', (done) => {
    let c = 0;
    pull(
      values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      drain(() => {
        c++;
      }, () => {
        try {
          expect(c).toBe(10);
          done();
        } catch (error) {
          done(error);
        }
      })
    );
  });
});