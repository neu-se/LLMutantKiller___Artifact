import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";
import { collect } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js";

describe('take mutation test', () => {
  it('should correctly handle stream termination with last option', (done) => {
    const source = values([1, 2, 3, 4, 5]);
    const takeStream = take(function(n: number) { return n < 3; }, { last: true });

    collect(
      source,
      takeStream,
      function(err: any, results: number[]) {
        try {
          // With last=true, we should get [1,2,3] (3 is the first item that fails the test)
          expect(results).toEqual([1, 2, 3]);
          done();
        } catch (err) {
          done(err);
        }
      }
    );
  });
});