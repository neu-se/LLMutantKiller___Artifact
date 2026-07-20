import { describe, it, expect } from "@jest/globals";
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take - error propagation", () => {
  it("should propagate errors from the source stream through take", (done) => {
    const ERR = new Error("source error");
    let callCount = 0;

    // Source that emits one value then an error
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      callCount++;
      if (callCount === 1) {
        cb(null, 1);
      } else {
        cb(ERR);
      }
    };

    // take(Boolean) - takes while truthy
    const through = take(Boolean);
    const reader = through(source);

    // First read should succeed
    reader(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);

      // Second read should propagate the error
      reader(null, (end: any, data: any) => {
        expect(end).toBe(ERR);
        done();
      });
    });
  });
});