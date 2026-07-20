import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should process data in synchronous loop when cbed starts false', (done) => {
    let readCount = 0;
    const source = (abort: any, cb: (err: any, data?: any) => void) => {
      readCount++;
      if (readCount <= 3) {
        cb(null, `data${readCount}`);
      } else {
        cb(true);
      }
    };

    const onDone = (err: any) => {
      expect(err).toBeNull();
      expect(readCount).toBe(4); // 3 data reads + end
      done();
    };

    const sink = drain(null, onDone);
    sink(source);
  });
});