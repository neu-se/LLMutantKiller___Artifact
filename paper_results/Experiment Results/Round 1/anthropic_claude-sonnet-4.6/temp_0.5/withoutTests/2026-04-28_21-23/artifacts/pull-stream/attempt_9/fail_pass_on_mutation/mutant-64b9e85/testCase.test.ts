import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("passes null to callback when stream ends with true and no match found", () => {
    return new Promise<void>((resolve, reject) => {
      // Force the source to pull exactly once then end
      // Use a through-style source that we control completely
      let pulled = false;
      
      function source(end: any, cb: Function) {
        if (end) return cb(end);
        if (!pulled) {
          pulled = true;
          // Return a value that doesn't match
          cb(null, "no-match");
        } else {
          // End with true - the standard pull-stream end signal
          cb(true);
        }
      }

      find(
        (x: any) => x === "match",
        (err: any, val: any) => {
          // Original: err===true ? null : err => null
          // Mutated: false ? null : err => true
          if (err === null) {
            resolve();
          } else {
            reject(new Error(`Expected null but got: ${JSON.stringify(err)}`));
          }
        }
      )(source);
    });
  });
});