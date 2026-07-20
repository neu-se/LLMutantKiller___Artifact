import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with more than 4 arguments', () => {
  it('should handle more than 4 arguments correctly', (done) => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results: number[] = [];

    const read = pull(
      pull.values(values),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x - 3),
      pull.map((x: number) => x * 3),
      pull.map((x: number) => x / 2),
      pull.collect((err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual([0, 4.5, 9, 13.5, 18, 22.5, 27, 31.5, 36, 40.5]);
        done();
      })
    );

    read(null, () => {});
  });
});