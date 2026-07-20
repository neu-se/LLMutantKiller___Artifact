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
        done(new Error("Should not receive end here"));
      } else {
        transformedSource(true, (err: Error | boolean | null) => {
          // The mutation changes cb(err || true) to cb(true)
          // Original: passes error through, mutated: always passes true
          try {
            expect(err).toBe(error);
            expect(err).not.toBe(true);
            done();
          } catch (e) {
            done(e);
          }
        });
      }
    });
  });
});