const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("find error handling", () => {
  it("should pass true error correctly", (done) => {
    const error = true;
    let callbackInvoked = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // End the stream with true
      }
    };

    pull(
      source,
      pull.find((data: any) => false, (err: any, result: any) => {
        callbackInvoked = true;
        // Original: cb(err === true ? null : err, null) -> passes null when err is true
        // Mutated: cb(err !== true ? null : err, null) -> passes true when err is true
        if (err === true) {
          done(new Error("Expected err to be null when original code runs"));
        } else if (err === null) {
          done();
        } else {
          done(new Error("Unexpected error value: " + err));
        }
      })
    );
  });
});