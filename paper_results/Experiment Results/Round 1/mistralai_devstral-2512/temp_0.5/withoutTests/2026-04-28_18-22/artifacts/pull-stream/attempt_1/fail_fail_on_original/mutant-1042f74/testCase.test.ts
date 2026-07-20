import drain from "./sinks/drain.js";

describe("drain sink", () => {
  it("should call done when stream ends without data", (done) => {
    const source = (abort, cb) => {
      if (abort) return cb(abort);
      cb(true); // End the stream immediately
    };

    const sink = drain(null, (err) => {
      expect(err).toBeNull();
      done();
    });

    sink(source);
  });
});