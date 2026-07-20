const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('drain mutation test', () => {
  it('should process all data items correctly in synchronous mode', (done) => {
    const input = [1, 2, 3, 4, 5];
    const results: number[] = [];

    pull(
      pull.values(input),
      pull.drain(
        (data: number) => {
          results.push(data);
          return true; // Continue processing
        },
        (err: any) => {
          expect(err).toBeFalsy();
          expect(results).toEqual([1, 2, 3, 4, 5]);
          done();
        }
      )
    );
  });
});