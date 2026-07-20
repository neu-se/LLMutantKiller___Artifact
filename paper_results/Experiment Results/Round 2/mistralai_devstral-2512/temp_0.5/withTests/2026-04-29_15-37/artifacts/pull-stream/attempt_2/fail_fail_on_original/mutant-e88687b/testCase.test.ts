const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    const drain = pull.drain(null, (err) => {
      expect(err).toBe(true);
      done();
    });

    const mockRead = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    };

    // Call drain.abort with a function as the first argument
    drain.abort(function (err) {
      // This should be treated as the callback, not as an error
      expect(err).toBe(true);
    });

    // Simulate the read being called
    drain(mockRead);
  });
});