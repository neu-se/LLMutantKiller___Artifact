const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

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
      pull.sinks.find((data: any) => false, (err: any, result: any) => {
        // Original: cb(err === true ? null : err, null) -> passes null when err is true
        // Mutated: cb(err !== true ? null : err, null) -> passes true when err is true
        if (err === null) {
          done(); // Passes on original
        } else if (err === true) {
          done(new Error("Mutation detected: expected null but got true")); // Fails on mutated
        } else {
          done(new Error("Unexpected error value: " + err));
        }
      })
    );
  });
});