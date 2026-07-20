import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not throw when end is truthy but not true and no done callback', () => {
    const error = new Error('test error');
    let readCalled = false;

    const source = (abort, cb) => {
      readCalled = true;
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    // Test without done callback
    const sink = drain(null);

    expect(() => {
      sink(source);
    }).not.toThrow();

    expect(readCalled).toBe(true);
  });
});