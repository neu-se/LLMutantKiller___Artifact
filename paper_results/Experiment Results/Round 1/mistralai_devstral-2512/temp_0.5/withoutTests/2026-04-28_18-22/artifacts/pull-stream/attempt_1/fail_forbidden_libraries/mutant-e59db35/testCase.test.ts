import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import pull = require("pull-stream");

describe("flatten mutation test", () => {
  it("should handle abort errors correctly", (done) => {
    const error = new Error("test error");
    const abortError = new Error("abort error");

    let abortCalled = false;
    let readCalled = false;

    const source = (abort, cb) => {
      if (abort) {
        abortCalled = true;
        cb(abort);
      } else {
        readCalled = true;
        cb(error);
      }
    };

    const flattened = flatten()(source);

    flattened(true, (err) => {
      expect(abortCalled).toBe(true);
      expect(readCalled).toBe(true);
      expect(err).toBe(error);
      done();
    });
  });
});