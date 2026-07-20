import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull mutation detection", () => {
  it("should correctly pipe when using pull as a through in another pull call", (done) => {
    let i = 0;
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i++ > 0) return cb(true);
      cb(null, 3);
    }

    function add1(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 1);
        });
      };
    }

    function mul2(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    }

    // pull(add1, mul2) used as a through stream inside another pull
    // This means pull(add1, mul2) is called with length=2
    // Its result (a partial function) is passed as argument to outer pull
    // outer pull calls it with the read stream
    // Original case 2: returns pull(read, add1, mul2) -> readable
    // Mutated default: same result
    // 
    // BUT: the partial function returned by pull(add1,mul2) has length=1
    // When outer pull processes it as a through: read = partialFn(prevRead)
    // partialFn(prevRead) calls the inner function with prevRead as read
    // Original: switch(2) case 2: pull(prevRead, add1, mul2) -> readable ✓
    // Mutated: switch(2) default: ref.unshift(prevRead); pull(prevRead, add1, mul2) -> readable ✓
    // Same!

    const result = pull(source, pull(add1, mul2));
    
    result(null, function(end: any, data: any) {
      if (end) { done(end === true ? undefined : end); return; }
      // (3+1)*2 = 8
      expect(data).toBe(8);
      done();
    });
  });
});