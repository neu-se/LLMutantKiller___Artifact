import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should propagate error object not true when terminating with error", (done) => {
    const error = new Error("Test error");
    const testStream = take(1);

    const source = (end: boolean | null, cb: (end: Error | boolean | null, data?: any) => void) => {
      if (end) {
        cb(error);
      } else {
        cb(null, 1);
      }
    };

    const transformedSource = testStream(source);

    transformedSource(null, (end: boolean | null, data?: any) => {
      if (end) {
        // Should receive the error object
        expect(end).toBe(error);
        done();
      } else {
        transformedSource(true, (err: Error | boolean | null) => {
          // The mutation changes this from cb(err || true) to cb(true)
          // So we should receive the error, not true
          expect(err).toBe(error);
          expect(err).not.toBe(true);
          done();
        });
      }
    });
  });
});