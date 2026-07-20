import { through } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";
import * as pull from "pull-stream";

describe("through - onEnd behavior", () => {
  it("should call onEnd with null when abort is true", (done) => {
    let onEndCalledWith: any = null;
    const onEnd = (value: any) => {
      onEndCalledWith = value;
    };

    const source = pull.values([1, 2, 3]);
    const throughStream = through(null, onEnd);

    const read = pull(
      source,
      throughStream,
      pull.drain(null, () => {})
    );

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