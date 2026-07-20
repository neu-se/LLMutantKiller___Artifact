import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should call read with abort when sink.abort is called before read is set', (done) => {
    const sink = drain();
    let readCalled = false;

    // Call abort before read is set
    sink.abort(null, () => {
      readCalled = true;
    });

    // Now set up the read function
    const mockRead = (end, cb) => {
      if (end) {
        cb();
      }
    };

    sink(mockRead);

    // The read function should not be called because abort was called before read was set
    // In the original code, read is undefined when abort is called, so it doesn't call read
    // In the mutated code, it always calls read even when read is undefined
    setTimeout(() => {
      expect(readCalled).toBe(false);
      done();
    }, 10);
  });
});