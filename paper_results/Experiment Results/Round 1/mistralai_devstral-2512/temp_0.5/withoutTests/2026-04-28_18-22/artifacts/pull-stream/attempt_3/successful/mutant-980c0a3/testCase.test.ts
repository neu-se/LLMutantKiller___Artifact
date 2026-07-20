import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not throw when stream ends with true and no done callback', () => {
    const source = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(true);
      }
    };

    const sink = drain(null);
    expect(() => {
      sink(source);
    }).not.toThrow();
  });
});