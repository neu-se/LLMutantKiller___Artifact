import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("find sink", () => {
  it("should pass null as error to callback when stream ends normally - checking drain end callback behavior", (done) => {
    // Read drain source to understand its end callback behavior
    let endCallbackArg: any = "NOT_CALLED";
    
    // Patch: create a source that ends with true, no items emitted
    // so ended remains false in find, meaning the end callback WILL call cb
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      // immediately end with true (no items)
      cb(true);
    }

    find(
      (data: any) => false, // never matches
      (err: any, data: any) => {
        endCallbackArg = err;
        // Original: null (because err===true => null)
        // Mutated: true (because false ? null : err => err which is true)
        expect(err).toBe(null);
        done();
      }
    )(source);
  });
});