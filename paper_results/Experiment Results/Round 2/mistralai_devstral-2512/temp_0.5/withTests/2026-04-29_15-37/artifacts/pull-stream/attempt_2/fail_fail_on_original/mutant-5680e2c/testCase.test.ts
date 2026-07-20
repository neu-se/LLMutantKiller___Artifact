import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through - onEnd behavior with abort", () => {
  it("should call onEnd with null when abort is true", (done) => {
    let onEndCalledWith: any = null;
    const onEnd = (value: any) => {
      onEndCalledWith = value;
    };

    const throughStream = through(null, onEnd);

    // Create a simple source that provides one value
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const read = throughStream(source);

    // Read one value
    read(null, (end, data) => {
      if (end) throw new Error("Unexpected end");
      // Abort with true
      read(true, (end) => {
        if (end !== true) throw new Error("Expected true end");
        // Give the onEnd callback time to execute
        setImmediate(() => {
          if (onEndCalledWith !== null) {
            done(new Error(`Expected onEnd to be called with null, but got ${onEndCalledWith}`));
          } else {
            done();
          }
        });
      });
    });
  });
});