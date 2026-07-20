import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should process data correctly when op returns false', (done) => {
    let readCount = 0;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) return cb(abort);
      readCount++;
      if (readCount === 1) {
        cb(null, 'data1');
      } else {
        cb(true); // End stream
      }
    };

    const op = (data: any) => {
      return false; // Signal to end after first data
    };

    const onDone = (err: any) => {
      expect(err).toBeNull();
      expect(readCount).toBe(2); // Should read initial data and then abort
      done();
    };

    const sink = drain(op, onDone);
    sink(source);
  });
});