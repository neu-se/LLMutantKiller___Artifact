import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with exactly 3 through streams", () => {
  it("should apply all three through streams when pipeline is created with 3 transforms", (done) => {
    let i = 0;
    const values = [1, 2, 3];

    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    }

    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    }

    function addTen(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 10);
        });
      };
    }

    function multiplyByThree(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 3);
        });
      };
    }

    // length === 3, triggers case 3 in switch
    // mutated: case 3 is empty, falls through to case 4
    // ref[3] is undefined, so multiplyByThree is skipped
    const pipeline = pull(double, addTen, multiplyByThree);
    const piped = pipeline(source);

    const results: number[] = [];

    function drain() {
      piped(null, function(end: any, data: any) {
        if (end === true) {
          // Original: double then addTen then multiplyByThree => [(1*2+10)*3, (2*2+10)*3, (3*2+10)*3] = [36, 42, 48]
          // Mutated: multiplyByThree skipped => [12, 14, 16]
          expect(results).toEqual([36, 42, 48]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        drain();
      });
    }

    drain();
  });
});