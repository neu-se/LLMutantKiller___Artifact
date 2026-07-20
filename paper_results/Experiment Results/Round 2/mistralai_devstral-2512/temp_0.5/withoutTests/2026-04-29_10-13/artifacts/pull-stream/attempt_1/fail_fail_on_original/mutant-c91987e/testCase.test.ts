import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should call the abort callback when sink.abort is invoked', (done) => {
    let abortCalled = false;
    const mockRead = (end, cb) => {
      if (end === true) {
        abortCalled = true;
        cb();
      }
    };

    const mockSource = (abort, cb) => {
      return mockRead;
    };

    const sink = drain(null, (err) => {
      if (err) {
        done(err);
      } else {
        expect(abortCalled).toBe(true);
        done();
      }
    });

    sink(mockSource);

    setImmediate(() => {
      sink.abort();
    });
  });
});