import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 4 arguments", () => {
  it("should correctly handle case 4 in the switch statement", (done) => {
    const input = [1, 2, 3, 4];
    const expectedOutput = [2, 4, 6, 8];

    pull(
      pull.values(input),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x),
      pull.map((x: number) => x),
      pull.collect((err: any, result: any) => {
        if (err) {
          done(err);
        } else {
          try {
            expect(result).toEqual(expectedOutput);
            done();
          } catch (e) {
            done(e);
          }
        }
      })
    );
  });
});