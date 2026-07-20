import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with 5 arguments", () => {
  it("should correctly handle 5 arguments in partial application", (done) => {
    const source = pull.values([1, 2, 3, 4, 5]);
    const transform1 = pull.map((x: number) => x * 2);
    const transform2 = pull.map((x: number) => x + 1);
    const transform3 = pull.map((x: number) => x.toString());
    const transform4 = pull.map((x: string) => x + "!");

    const pipeline = pull(transform1, transform2, transform3, transform4);

    pull(
      source,
      pipeline,
      pull.collect((err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(["3!", "5!", "7!", "9!", "11!"]);
        done();
      })
    );
  });
});