import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    const receivedArgs: any[] = [];

    const tr = through(null, function(err: any) {
      receivedArgs.push(err);
    });

    // Create a simple source that ends immediately
    const source = function(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      // End the stream normally
      cb(true);
    };

    const read = tr(source);

    read(null, function(end: any, data: any) {
      // Stream ended, onEnd should have been called with null
      expect(receivedArgs.length).toBe(1);
      expect(receivedArgs[0]).toBeNull();
      done();
    });
  });
});