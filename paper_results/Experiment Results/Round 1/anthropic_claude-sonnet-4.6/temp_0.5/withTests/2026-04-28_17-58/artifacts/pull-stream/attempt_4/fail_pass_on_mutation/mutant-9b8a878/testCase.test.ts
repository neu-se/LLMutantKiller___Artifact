import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should correctly pipe values through partial pipeline where args array integrity matters", (done) => {
    const results: number[] = [];
    
    const makeThrough = (n: number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end);
        cb(null, data + n);
      });
    };

    // Use exactly 1 argument to create partial sink (a.length === 1)
    // then verify the pipeline works with the default switch case (5+ args)
    const t1 = makeThrough(1);
    const t2 = makeThrough(2);  
    const t3 = makeThrough(3);
    const t4 = makeThrough(4);
    const t5 = makeThrough(5);

    const pipeline = pull(t1, t2, t3, t4, t5);

    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i++ > 0) return cb(true);
      cb(null, 0);
    };

    const read = pipeline(source);
    read(null, (end: any, data: number) => {
      expect(data).toBe(15); // 0+1+2+3+4+5
      done();
    });
  });
});