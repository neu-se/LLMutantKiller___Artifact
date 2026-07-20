import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import * as pullStreams from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 3 arguments", () => {
  it("should correctly handle the case with 3 arguments in the curried function", (done) => {
    const input = [1, 2, 3];
    const expectedOutput = [2, 4, 6];

    pull(
      pullStreams.values(input),
      pull(
        pullStreams.map((x: number) => x * 2),
        pullStreams.map((x: number) => x),
        pullStreams.map((x: number) => x)
      ),
      pullStreams.collect((err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual(expectedOutput);
        done();
      })
    );
  });
});