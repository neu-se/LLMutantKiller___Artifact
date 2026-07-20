import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle 3 arguments in the pull function', (done) => {
    const input = [1, 2, 3];
    const expectedOutput = [2, 4, 6];

    pull(
      pull.values(input),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x),
      pull.collect((err: any, result: number[]) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual(expectedOutput);
        done();
      })
    );
  });
});