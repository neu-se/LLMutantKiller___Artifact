import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should correctly handle partial application where args array length is checked via switch default case with 5 streams", (done) => {
    // Track call order to verify all transforms are applied
    const results: number[] = [];
    
    const makeThrough = (val: number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        results.push(val);
        cb(null, data + val);
      });
    };

    // Use 5 args to hit the default switch case
    // In default case: ref.unshift(read), pull.apply(null, ref)
    // ref must have exactly 5 elements (indices 0-4 set by loop)
    const t1 = makeThrough(1);
    const t2 = makeThrough(2);
    const t3 = makeThrough(3);
    const t4 = makeThrough(4);
    const t5 = makeThrough(5);

    const partial = pull(t1, t2, t3, t4, t5);

    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i >= 1) return cb(true);
      cb(null, i++);
    };

    const read = partial(source);
    read(null, (end: any, data: any) => {
      // 0 + 1 + 2 + 3 + 4 + 5 = 15
      expect(data).toBe(15);
      expect(results).toEqual([1, 2, 3, 4, 5]);
      done();
    });
  });
});