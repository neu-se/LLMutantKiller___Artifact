import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const sink = drain(null, done);
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    // Call sink.abort with a function as the first argument
    sink.abort(function (err) {
      // This should be treated as the callback, not as an error
      expect(err).toBe(true);
      done();
    });

    // Simulate the read being called
    sink(mockRead);
  });
});