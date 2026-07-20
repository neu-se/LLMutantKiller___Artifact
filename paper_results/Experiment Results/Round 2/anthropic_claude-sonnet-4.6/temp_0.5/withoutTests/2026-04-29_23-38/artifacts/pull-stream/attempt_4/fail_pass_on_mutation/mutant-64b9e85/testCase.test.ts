import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import path from "path";
import { readFileSync } from "fs";

describe("find sink - drain end callback value", () => {
  it("should call cb with null error when stream ends normally (err===true case)", (done) => {
    // Read drain source to understand what it passes to end callback
    const drainPath = path.resolve("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    
    // Create a source that ends with true (normal pull-stream end signal)
    // and verify what value the find end-callback receives
    let receivedErr: any = undefined;
    
    // Intercept by wrapping find's callback
    const values = [10, 20, 30];
    let i = 0;
    
    function source(end: any, cb: Function) {
      if (end) { cb(end); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    }

    find(
      (x: any) => x === 999, // never matches
      (err: any, data: any) => {
        receivedErr = err;
        // Original: null (because err===true maps to null)
        // Mutated: true (because false?null:err always returns err=true)
        expect(err).toBeNull();
        done();
      }
    )(source);
  });
});