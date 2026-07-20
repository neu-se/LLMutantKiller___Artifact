import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('collects correct number of items from sync source', (done) => {
    let readCount = 0;
    let i = 0;

    drain(
      null,
      (err: any) => {
        expect(err).toBeNull();
        expect(readCount).toBe(3);
        done();
      }
    )((abort: any, cb: Function) => {
      if (abort) return cb(abort);
      readCount++;
      if (i >= 3) return cb(true);
      cb(null, i++);
    });
  });
});