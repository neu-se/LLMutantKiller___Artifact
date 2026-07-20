import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle synchronous source correctly when cbed is initially false', (done) => {
    let calls = 0;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      calls++;
      if (calls === 1) {
        cb(null, 'data');
      } else {
        cb(true);
      }
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