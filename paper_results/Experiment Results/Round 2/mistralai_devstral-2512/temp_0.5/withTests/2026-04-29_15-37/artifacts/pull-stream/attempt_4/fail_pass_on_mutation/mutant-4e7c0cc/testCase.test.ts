const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
const map = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js");
const collect = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js");

describe("pull function with 4 arguments", () => {
  it("should correctly handle case 4 in the switch statement", (done) => {
    const input = [1, 2, 3, 4];
    const expectedOutput = [2, 4, 6, 8];

    pull(
      values(input),
      map((x: number) => x * 2),
      map((x: number) => x),
      map((x: number) => x),
      collect((err: any, result: any) => {
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