import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should properly abort when sink.abort is called', (done) => {
    let abortWasCalled = false;
    const source = (abort: any, cb: () => void) => {
      return (end: any, callback: () => void) => {
        if (end === true) {
          abortWasCalled = true;
          callback();
        }
      };
    };

    const sink = drain(null, (err) => {
      expect(abortWasCalled).toBe(true);
      done();
    });

    const read = source(null, () => {});
    sink(read);

    setImmediate(() => {
      sink.abort();
    });
  });
});