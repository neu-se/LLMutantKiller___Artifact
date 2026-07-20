const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find error handling", () => {
  it("should pass null when error is true", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // End stream with true error
      }
    };

    pull(
      source,
      find((data: any) => false, (err: any, result: any) => {
        // Original: cb(err === true ? null : err, null)
        // Mutated: cb(err !== true ? null : err, null)
        if (err === null) {
          done(); // Passes on original
        } else {
          done(new Error(`Expected null but got ${err}`)); // Fails on mutated
        }
      })
    );
  });
});