import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source with exact max boundary", () => {
  it("should emit values from 0 to max-1 when max is provided", (done) => {
    const max = 5;
    const expectedValues = [0, 1, 2, 3, 4];

    pull(
      count(max),
      pull.collect((err, result) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual(expectedValues);
        done();
      })
    );
  });
});