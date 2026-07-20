const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find error handling", () => {
  it("should handle true error value correctly", (done) => {
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
        // Original: cb(err === true ? null : err, null) -> passes null when err is true
        // Mutated: cb(err !== true ? null : err, null) -> passes true when err is true
        if (err === null && result === null) {
          done(); // Passes on original
        } else if (err === true && result === null) {
          done(new Error("Mutation detected: error should be null but got true")); // Fails on mutated
        } else {
          done(new Error(`Unexpected result: err=${err}, result=${result}`));
        }
      })
    );
  });
});