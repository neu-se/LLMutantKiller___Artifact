import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take - terminate with error propagation", () => {
  it("should propagate actual errors from source when terminating with last=true", (done) => {
    const actualError = new Error("source error");
    
    // Create a source that returns an error when aborted
    let callCount = 0;
    function source(end: any, cb: Function) {
      if (end) {
        // When asked to abort, return an actual error
        cb(actualError);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, "item1");
      } else if (callCount === 2) {
        cb(null, "item2");
      } else {
        cb(true); // end of stream
      }
    }
    
    // Use take with last=true, take 1 item
    // When test returns false for second item, it should call terminate
    // terminate calls read(true, cb) which returns actualError
    // Original: cb(actualError || true) = cb(actualError)
    // Mutated: cb(true)
    const through = take(function(data: any) {
      return data === "item1"; // only accept item1, reject item2
    }, { last: false }); // last=false means when test fails, call terminate(cb) without passing data
    
    const reader = through(source);
    
    // Read first item (passes test)
    reader(null, function(end: any, data: any) {
      if (end) {
        done(new Error("unexpected end: " + end));
        return;
      }
      // data should be "item1"
      
      // Read second item (fails test, triggers terminate)
      reader(null, function(end2: any, data2: any) {
        // When last=false and test fails, terminate is called
        // terminate calls read(true, cb) which returns actualError
        // Original: cb(actualError) - end2 should be actualError
        // Mutated: cb(true) - end2 would be true
        
        if (end2 === actualError) {
          done(); // Original behavior - test passes
        } else if (end2 === true) {
          done(new Error("Got 'true' instead of actual error - this is the mutated behavior"));
        } else {
          done(new Error("Unexpected result: " + end2 + ", data: " + data2));
        }
      });
    });
  });
});