const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const map = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("pull with 5 arguments", () => {
  it("should correctly handle 5 arguments in partial application", (done) => {
    const source = values([1, 2, 3, 4, 5]);
    const transform1 = map((x: number) => x * 2);
    const transform2 = map((x: number) => x + 1);
    const transform3 = map((x: number) => x.toString());
    const transform4 = map((x: string) => x + "!");
    const transform5 = map((x: string) => x.toUpperCase());

    const pipeline = pull(transform1, transform2, transform3, transform4, transform5);

    pull(
      source,
      pipeline,
      collect((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(["3!", "5!", "7!", "9!", "11!"]);
        done();
      })
    );
  });
});