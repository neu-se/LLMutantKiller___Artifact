import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("calls cb with null error (not true) when stream ends with err===true", (done) => {
    // We need to trigger find's end callback with err===true
    // drain.js reads data in a loop; when source signals end with true,
    // drain calls the end callback with that value
    // Let's verify by making a source that errors with a non-true, non-null value
    // to confirm the path, then test with true
    
    // Source that ends immediately with true (standard pull-stream end signal)
    // drain should pass this true to find's end callback
    // Original: cb(true === true ? null : true, null) = cb(null, null)
    // Mutated:  cb(false ? null : true, null) = cb(true, null)
    
    // The trick: maybe drain passes null not true to end cb for normal end
    // Let's instead test with a source that passes true as an ERROR
    // by having it return true synchronously before any data
    
    const receivedArgs: any[] = [];
    
    // Minimal pull-stream source that ends with true immediately
    function source(end: any, cb: Function) {
      cb(true);
    }

    find(
      (x: any) => false,
      (...args: any[]) => {
        receivedArgs.push(...args);
        // Original: [null, null]
        // Mutated (if drain passes true): [true, null]  
        // Mutated (if drain passes null): [null, null] - indistinguishable
        expect(receivedArgs[0]).toBeNull();
        done();
      }
    )(source);
  });
});