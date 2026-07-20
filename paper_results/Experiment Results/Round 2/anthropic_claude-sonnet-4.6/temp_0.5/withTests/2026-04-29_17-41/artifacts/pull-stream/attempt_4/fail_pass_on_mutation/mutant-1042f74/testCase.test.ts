import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done exactly once when stream ends normally', (done) => {
    let doneCount = 0;
    let i = 0;
    const data = [1, 2, 3];

    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= data.length) return cb(true);
      cb(null, data[i++]);
    };

    drain(
      null,
      (err: any) => {
        doneCount++;
        expect(doneCount).toBe(1);
        expect(err).toBeNull();
        done();
      }
    )(source);
  });
});