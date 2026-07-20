const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe('drain mutation test', () => {
  it('should process data correctly when cbed is initially false', (done) => {
    const input = [1, 2, 3];
    const results: number[] = [];

    pull(
      pull.values(input),
      pull.drain((data: number) => {
        results.push(data);
      }, () => {
        expect(results).toEqual([1, 2, 3]);
        done();
      })
    );
  });
});