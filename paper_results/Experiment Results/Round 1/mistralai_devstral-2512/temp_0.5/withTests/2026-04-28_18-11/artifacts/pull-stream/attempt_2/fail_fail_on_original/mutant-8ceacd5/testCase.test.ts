import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with more than 4 arguments', () => {
  it('should handle more than 4 arguments correctly', (done) => {
    const values = [1, 2, 3, 4, 5];
    const results: number[] = [];

    const read = pull(
      pull.values(values),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x - 3),
      pull.map((x: number) => x * 3),
      pull.collect((err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual([0, 9, 18, 27, 36]);
        done();
      })
    );

    read(null, () => {});
  });
});