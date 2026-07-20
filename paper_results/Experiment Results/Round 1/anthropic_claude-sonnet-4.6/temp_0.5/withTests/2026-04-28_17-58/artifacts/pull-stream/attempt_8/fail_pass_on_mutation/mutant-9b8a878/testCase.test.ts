import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial sink with single through function should correctly transform values", () => {
    const results: number[] = [];
    
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    // a.length === 1 so takes partial sink path
    const pipeline = pull(double);
    
    let i = 0;
    const values = [1, 2, 3];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const read = pipeline(source);
    
    let done = false;
    function drain() {
      read(null, (end: any, data: number) => {
        if (end) {
          done = true;
          return;
        }
        results.push(data);
        drain();
      });
    }
    drain();
    
    expect(done).toBe(true);
    expect(results).toEqual([2, 4, 6]);
  });
});