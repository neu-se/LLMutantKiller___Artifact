import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";
import pull from "pull-stream";

describe("take mutation test", () => {
  it("should handle errors correctly in terminate function", (done) => {
    const error = new Error("Test error");
    const testStream = take(1);
    let errorReceived = false;

    const source = (end, cb) => {
      if (end) {
        cb(error);
      } else {
        cb(null, 1);
      }
    };

    pull(
      source,
      testStream,
      pull.collect((err, results) => {
        if (err) {
          errorReceived = true;
          expect(err).toBe(error);
        }
        expect(errorReceived).toBe(true);
        done();
      })
    );
  });
});