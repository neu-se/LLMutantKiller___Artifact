import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle abort before any reads with correct done callback behavior', (done) => {
    let readCalled = false;
    
    const source = (abort: any, cb: Function) => {
      readCalled = true;
      cb(abort || true);
    };

    const sink = drain(
      null,
      (err: any) => {
        expect(err).toBeNull();
        done();
      }
    );

    sink.abort();
    sink(source);
  });
});