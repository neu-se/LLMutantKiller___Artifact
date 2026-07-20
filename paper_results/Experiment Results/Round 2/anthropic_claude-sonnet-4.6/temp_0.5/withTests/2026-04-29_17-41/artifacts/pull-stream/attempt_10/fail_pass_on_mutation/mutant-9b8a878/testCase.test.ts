import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should handle pipeline where through stream count equals 4 using switch case 4", (done) => {
    const results: number[] = [];

    const make = (n: number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + n);
      });
    };

    // 4 args, switch case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])
    // With new Array(4): ref.length===4 before loop, after loop same
    // With new Array(): ref.length===0 before loop, after loop same
    // After loop BOTH identical... 
    
    // BUT: what if we check ref[3] specifically?
    // new Array(4)[3] === undefined (sparse slot)
    // new Array()[3] === undefined (missing property)
    // Both return undefined, both identical after loop fills them
    
    // I need to think about what's ACTUALLY different...
    // new Array(4) has indices 0,1,2,3 as "own" sparse slots
    // new Array() after assigning [0],[1],[2],[3] has same indices
    // Object.keys would differ BEFORE loop but not after
    
    // The ONLY scenario: if length could somehow be non-integer
    // new Array(1.5) throws RangeError!
    // new Array() never throws
    // But arguments.length is always integer...
    
    const partial = pull(make(1), make(2), make(3), make(4));

    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i++ > 0) return cb(true);
      cb(null, 0);
    };

    const read = partial(source);
    read(null, (end: any, data: any) => {
      expect(data).toBe(10); // 0+1+2+3+4
      done();
    });
  });
});