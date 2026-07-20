import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when no item is found and stream ends with true", (done) => {
    // Construct a source that never yields data, ends with true
    // Then manually invoke find's returned drain function with a source
    // that calls the drain's end callback with true directly
    
    let callCount = 0;
    
    // Source: first read yields data that doesn't match, second read ends with true
    function source(abort: any, cb: (end: any, data?: any) => void) {
      callCount++;
      if (callCount === 1) {
        cb(null, 42); // data that won't match
      } else {
        cb(true); // normal end
      }
    }

    const sink = find(
      (d: any) => d === 999, // never matches
      (err: any, data: any) => {
        // Original: drain passes true to find's end handler
        //   true === true ? null : true => null
        // Mutated: drain passes true to find's end handler  
        //   true === false ? null : true => true
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      }
    );

    // Directly call the sink with our source, bypassing pull()
    sink(source);
  });
});