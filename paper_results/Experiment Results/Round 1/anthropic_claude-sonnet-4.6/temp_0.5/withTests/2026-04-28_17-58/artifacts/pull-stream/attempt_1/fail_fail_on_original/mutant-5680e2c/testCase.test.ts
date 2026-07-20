import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedArgs: any[] = [];
    
    const onEnd = (err: any) => {
      receivedArgs.push(err);
    };

    const throughStream = through(null, onEnd);

    // Create a simple source that ends after one item
    let called = false;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end || called) {
        cb(true, undefined);
      } else {
        called = true;
        cb(null, 1);
      }
    };

    const read = throughStream(source);

    // First read: get the value
    read(null, (end: any, data: any) => {
      // Second read: trigger end
      read(null, (end2: any, data2: any) => {
        // At this point, onEnd should have been called with null (normal end)
        expect(receivedArgs.length).toBe(1);
        expect(receivedArgs[0]).toBe(null);
        done();
      });
    });
  });
});