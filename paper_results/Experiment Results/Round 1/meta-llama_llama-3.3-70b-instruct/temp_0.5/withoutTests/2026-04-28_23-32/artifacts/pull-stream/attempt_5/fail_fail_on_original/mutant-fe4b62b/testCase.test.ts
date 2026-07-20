import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle abort correctly', (done) => {
    let called = false;
    const read = (err: any, cb: (end: any, data: any) => void) => {
      cb(null, null);
    };

    const sink = drain(null, () => {});
    const cb = () => {
      called = true;
      done();
    };
    const err = () => {};
    sink.abort(err, cb);
    if (!called) {
      done.fail("Callback was not called");
    }
  });
});