import { describe, it, expect } from "@jest/globals";
import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (not with true)", (done) => {
    const receivedErrors: any[] = [];

    const onEnd = (err: any) => {
      receivedErrors.push(err);
    };

    const tr = through(null, onEnd);

    // Create a simple source that ends immediately
    const source = (abort: any, cb: Function) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true); // end of stream
      }
    };

    const readable = tr(source);

    readable(null, (end: any, data: any) => {
      // Stream ended, now check what onEnd received
      expect(end).toBe(true);
      expect(receivedErrors.length).toBe(1);
      // Original: onEnd(null) when abort === true
      // Mutant: onEnd(true) when abort === true (because abort !== false)
      expect(receivedErrors[0]).toBeNull();
      done();
    });
  });
});