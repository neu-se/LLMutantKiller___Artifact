import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback behavior", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedArgs: any[] = [];
    
    const onEnd = (err: any) => {
      receivedArgs.push(err);
    };

    const throughStream = through(null, onEnd);

    // Create a simple source that ends after one item
    let called = false;
    const source = (end: any, cb: Function) => {
      if (end || called) {
        cb(true, null); // signal end
      } else {
        called = true;
        cb(null, 1);
      }
    };

    const readable = throughStream(source);

    // First read - gets data
    readable(null, (end: any, data: any) => {
      if (!end) {
        // Second read - gets end signal
        readable(null, (end2: any, data2: any) => {
          // At this point onEnd should have been called with null (normal end)
          // In original: onEnd(true === true ? null : true) => onEnd(null)
          // In mutated:  onEnd(true !== true ? null : true) => onEnd(true)
          expect(receivedArgs.length).toBe(1);
          expect(receivedArgs[0]).toBeNull();
          done();
        });
      }
    });
  });
});