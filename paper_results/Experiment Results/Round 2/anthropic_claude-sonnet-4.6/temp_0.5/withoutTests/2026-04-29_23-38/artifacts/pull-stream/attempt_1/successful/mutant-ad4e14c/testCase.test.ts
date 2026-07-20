import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedArgs: any[] = [];
    
    const onEnd = (err: any) => {
      receivedArgs.push(err);
    };

    const thru = through(null, onEnd);

    // Create a simple source that ends immediately
    const source = (_end: any, cb: Function) => {
      cb(true, null); // signal end of stream
    };

    const sink = thru(source);

    // Read from the sink, triggering the end
    sink(null, (end: any, data: any) => {
      // When end is true, onEnd should have been called with null (not true)
      if (end) {
        try {
          expect(receivedArgs.length).toBe(1);
          expect(receivedArgs[0]).toBeNull();
          done();
        } catch (e) {
          done(e);
        }
      }
    });
  });
});