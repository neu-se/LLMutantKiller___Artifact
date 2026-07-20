import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream";

describe('take mutation test', () => {
  it('should correctly handle stream termination with last option', (done) => {
    const source = pull.values([1, 2, 3, 4, 5]);
    const takeStream = pull.take(function(n: number) { return n < 3; }, { last: true });

    let results: number[] = [];
    let aborted = false;

    const read = pull(
      source,
      takeStream,
      pull.through(function(data: number) {
        results.push(data);
      })
    );

    read(null, function(end, data) {
      if (end) {
        // After stream ends, verify we got the expected data
        setImmediate(() => {
          try {
            // With last=true, we should get [1,2,3] (3 is the first item that fails the test)
            expect(results).toEqual([1, 2, 3]);
            done();
          } catch (err) {
            done(err);
          }
        });
      }
    });
  });
});