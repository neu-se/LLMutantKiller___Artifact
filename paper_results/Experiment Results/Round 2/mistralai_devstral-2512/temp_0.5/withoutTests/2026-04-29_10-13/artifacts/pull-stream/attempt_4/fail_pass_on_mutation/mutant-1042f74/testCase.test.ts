import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle synchronous source with immediate end', (done) => {
    let calls = 0;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      calls++;
      cb(true); // End immediately
    };

    const onDone = (err: any) => {
      expect(err).toBeNull();
      expect(calls).toBe(1);
      done();
    };

    const sink = drain(null, onDone);
    sink(source);
  });
});