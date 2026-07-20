import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("reduce with two arguments", () => {
  it("should use the first value as the initial accumulator when no initial value is provided", (done) => {
    pull(
      pull.values([2, 3, 4]),
      pull.reduce((acc: number, val: number) => acc * val, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(24); // 2 * 3 * 4
        done();
      })
    );
  });
});