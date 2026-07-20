import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain basic functionality', () => {
  it('should invoke done callback after draining a synchronous source', (done) => {
    const collected: number[] = [];
    let index = 0;
    const sourceData = [10, 20, 30];

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) return cb(abort);
      if (index >= sourceData.length) return cb(true);
      cb(null, sourceData[index++]);
    }

    const sink = drain(
      (data: number) => { collected.push(data); },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([10, 20, 30]);
        done();
      }
    );

    sink(source);
  });
});