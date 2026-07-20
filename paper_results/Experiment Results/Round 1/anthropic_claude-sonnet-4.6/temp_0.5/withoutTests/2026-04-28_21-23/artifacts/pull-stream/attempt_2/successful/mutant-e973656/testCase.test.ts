import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not throw when stream ends normally and no done callback is provided", () => {
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      cb(true);
    }

    expect(() => {
      const sink = drain(null);
      sink(source);
    }).not.toThrow();
  });
});