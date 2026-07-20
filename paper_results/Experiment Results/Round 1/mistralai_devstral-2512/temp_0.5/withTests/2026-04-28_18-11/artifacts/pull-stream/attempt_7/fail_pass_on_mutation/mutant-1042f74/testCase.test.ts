const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe('drain mutation test', () => {
  it('should process all data items in synchronous mode', (done) => {
    const input = [1, 2, 3];
    const results: number[] = [];

    pull(
      pull.values(input),
      pull.drain(
        (data: number) => {
          results.push(data);
        },
        (err: any) => {
          expect(err).toBeFalsy();
          expect(results).toEqual([1, 2, 3]);
          done();
        }
      )
    );
  });
});