import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback behavior", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedValues: any[] = [];
    
    const onEnd = (err: any) => {
      receivedValues.push(err);
    };
    
    // Create a simple source that ends after one item
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end, null);
      cb(true, null); // end the stream
    }
    
    const throughStream = through(undefined, onEnd);
    const sink = throughStream(source);
    
    // Read from the sink - this will trigger the end
    sink(null, (end: any, data: any) => {
      // After stream ends, check what onEnd received
      setTimeout(() => {
        // In original: onEnd should be called with null (since abort === true)
        // In mutated: onEnd would be called with true (since abort !== false)
        expect(receivedValues.length).toBeGreaterThan(0);
        expect(receivedValues[0]).toBeNull();
        done();
      }, 0);
    });
  });
});