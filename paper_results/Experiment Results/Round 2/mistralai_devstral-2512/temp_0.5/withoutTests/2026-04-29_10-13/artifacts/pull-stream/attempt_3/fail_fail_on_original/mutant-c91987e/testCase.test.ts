import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should execute abort callback when sink.abort is called', (done) => {
    let abortExecuted = false;
    const mockRead = (end: unknown, cb: () => void) => {
      if (end === true) {
        abortExecuted = true;
        cb();
      }
    };

    const sink = drain(null, (err: Error | null) => {
      if (err) {
        done(err);
      } else {
        expect(abortExecuted).toBe(true);
        done();
      }
    });

    sink(mockRead);

    setImmediate(() => {
      sink.abort();
    });
  });
});