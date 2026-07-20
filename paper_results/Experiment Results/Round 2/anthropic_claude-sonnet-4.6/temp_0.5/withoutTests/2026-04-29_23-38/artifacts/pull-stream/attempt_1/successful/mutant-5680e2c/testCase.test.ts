import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedArgs: any[] = [];
    
    const onEnd = (err: any) => {
      receivedArgs.push(err);
    };

    const throughStream = through(null, onEnd);

    // Create a simple source that ends after one item
    let count = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end || count >= 1) {
        cb(true, null);
        return;
      }
      count++;
      cb(null, count);
    };

    const sink = throughStream(source);

    // Read first item
    sink(null, (end: any, data: any) => {
      if (!end) {
        // Read again to get end of stream
        sink(null, (end2: any, data2: any) => {
          // Stream ended, onEnd should have been called with null
          expect(receivedArgs.length).toBe(1);
          expect(receivedArgs[0]).toBe(null);
          done();
        });
      }
    });
  });
});