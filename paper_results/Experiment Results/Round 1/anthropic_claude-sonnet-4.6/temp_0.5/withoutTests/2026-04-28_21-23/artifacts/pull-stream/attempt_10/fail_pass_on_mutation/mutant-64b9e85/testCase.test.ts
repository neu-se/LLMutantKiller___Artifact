import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("detects mutation by checking what error value drain passes to end callback", () => {
    return new Promise<void>((resolve, reject) => {
      // Create a source that ends with a non-true, non-null error
      // If err is an actual Error object, then:
      // Original: err===true ? null : err => passes the Error object
      // Mutated:  false ? null : err      => passes the Error object  
      // Same result for real errors...
      
      // BUT: what if drain normalizes the end signal?
      // Let's try: source ends with null (not true)
      // Original: null===true ? null : null => null
      // Mutated:  false ? null : null => null
      // Same...
      
      // What if drain passes the end signal as-is?
      // Let's instrument by wrapping find's cb to capture exact value
      
      let receivedErr: any = Symbol("not-called");
      
      // Source that ends immediately with no values
      function source(end: any, cb: Function) {
        if (end) return cb(end);
        cb(true); // end with true
      }

      const sink = find(
        (x: any) => false,
        (err: any, val: any) => {
          receivedErr = err;
          // Check strict equality - null vs true
          if (err === null) {
            resolve();
          } else {
            reject(new Error(`Got ${String(err)} instead of null`));
          }
        }
      );

      // Manually drive the sink - sink IS the read function
      // In pull-stream, sink(source) starts the flow
      sink(source);
    });
  });
});