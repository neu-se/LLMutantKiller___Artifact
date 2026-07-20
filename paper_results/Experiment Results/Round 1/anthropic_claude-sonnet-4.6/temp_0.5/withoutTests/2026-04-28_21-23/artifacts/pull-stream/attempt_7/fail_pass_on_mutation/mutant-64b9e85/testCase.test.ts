import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("distinguishes null from true in callback error argument on normal stream end", () => {
    return new Promise<void>((resolve, reject) => {
      let count = 0;
      function source(end: any, cb: Function) {
        if (end) return cb(end);
        if (count++ < 2) cb(null, count);
        else cb(true);
      }

      find(
        (x: any) => x === 999, // never matches
        (err: any, val: any) => {
          // Original: err===true becomes null
          // Mutated: false ? null : err => err stays as true
          if (err === null) {
            resolve();
          } else if (err === true) {
            reject(new Error(`err was true instead of null - mutation detected`));
          } else {
            reject(new Error(`unexpected err: ${err}`));
          }
        }
      )(source);
    });
  });
});