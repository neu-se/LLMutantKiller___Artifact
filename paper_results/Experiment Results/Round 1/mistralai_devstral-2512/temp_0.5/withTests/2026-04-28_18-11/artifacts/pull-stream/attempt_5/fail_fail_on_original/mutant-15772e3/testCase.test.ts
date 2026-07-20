const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter sync behavior test", () => {
  it("should correctly filter values with synchronous callback", (done) => {
    const input = [1, 2, 3, 4, 5];
    const expected = [2, 4];
    const results: number[] = [];

    const filterStream = filter((d: number) => d % 2 === 0);

    let index = 0;
    const source = (end: any, cb: any) => {
      if (end) {
        cb(end);
      } else if (index >= input.length) {
        cb(true);
      } else {
        cb(null, input[index++]);
      }
    };

    const read = filterStream(source);

    const next = () => {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual(expected);
          done();
          return;
        }
        results.push(data);
        if (results.length < expected.length) {
          next();
        } else {
          read(true, () => {});
        }
      });
    };

    next();
  });
});