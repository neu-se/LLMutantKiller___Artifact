import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should propagate errors correctly when terminating", (done) => {
    const error = new Error("Test error");
    const testStream = take(1);

    const source = (end: boolean | null, cb: (end: Error | boolean | null, data?: any) => void) => {
      if (end) {
        cb(error);
      } else {
        cb(null, 1);
      }
    };

    const sink = (read: (end: boolean | null, cb: (end: Error | boolean | null, data?: any) => void) => void) => {
      read(null, (end, data) => {
        if (end) {
          expect(end).toBe(error);
          done();
        } else {
          read(true, (err) => {
            expect(err).toBe(error);
            done();
          });
        }
      });
    };

    const transformedSource = testStream(source);
    transformedSource(null, sink);
  });
});