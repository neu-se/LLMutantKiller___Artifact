import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle synchronous source with multiple reads when cbed is initially false', (done) => {
    let calls = 0;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      calls++;
      if (calls === 1) {
        cb(null, 'data1');
      } else if (calls === 2) {
        cb(null, 'data2');
      } else {
        cb(true);
      }
    };

    const onDone = (err: any) => {
      expect(err).toBeNull();
      expect(calls).toBe(3);
      done();
    };

    const sink = drain(null, onDone);
    sink(source);
  });
});