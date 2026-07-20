import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import * as pullStreams from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with more than 4 arguments', () => {
  it('should handle more than 4 arguments correctly', (done) => {
    const values = [1, 2, 3, 4, 5];
    const results: number[] = [];

    const read = pull(
      pullStreams.values(values),
      pullStreams.map((x: number) => x * 2),
      pullStreams.map((x: number) => x + 1),
      pullStreams.map((x: number) => x - 3),
      pullStreams.map((x: number) => x * 3),
      pullStreams.collect((err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual([0, 9, 18, 27, 36]);
        done();
      })
    );

    read(null, () => {});
  });
});