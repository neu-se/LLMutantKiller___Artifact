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

    const transformedSource = testStream(source);

    transformedSource(null, (end: boolean | null, data?: any) => {
      if (end) {
        expect(end).toBe(error);
        done();
      } else {
        transformedSource(true, (err: Error | boolean | null) => {
          expect(err).toBe(error);
          done();
        });
      }
    });
  });
});