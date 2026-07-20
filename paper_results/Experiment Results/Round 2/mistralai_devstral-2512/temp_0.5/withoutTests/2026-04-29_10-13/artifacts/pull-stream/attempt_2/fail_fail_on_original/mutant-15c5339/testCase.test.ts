import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take mutation test", () => {
  it("should propagate errors correctly when terminating", (done) => {
    const error = new Error("Test error");
    const testStream = take(1);

    const source = (end, cb) => {
      if (end) {
        cb(error);
      } else {
        cb(null, 1);
      }
    };

    const sink = (read) => {
      read(null, (end, data) => {
        if (end) {
          expect(end).toBe(error);
          done();
        } else {
          // Continue reading to trigger termination
          read(true, (err) => {
            expect(err).toBe(error);
            done();
          });
        }
      });
    };

    testStream(source)(null, sink);
  });
});