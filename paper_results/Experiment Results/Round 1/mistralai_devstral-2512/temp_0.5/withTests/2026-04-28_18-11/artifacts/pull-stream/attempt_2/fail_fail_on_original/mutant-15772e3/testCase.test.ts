import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("filter sync behavior test", () => {
  it("should correctly filter values with synchronous callback", (done) => {
    const input = [1, 2, 3, 4, 5];
    const expected = [2, 4];
    const results: number[] = [];

    const filterStream = filter((d: number) => d % 2 === 0);
    const read = filterStream(pull.values(input));

    let count = 0;
    const next = (end: any, cb: any) => {
      read(end, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual(expected);
          done();
          return;
        }
        results.push(data);
        if (++count < 3) {
          next(null, cb);
        } else {
          read(true, cb);
        }
      });
    };

    next(null, () => {});
  });
});