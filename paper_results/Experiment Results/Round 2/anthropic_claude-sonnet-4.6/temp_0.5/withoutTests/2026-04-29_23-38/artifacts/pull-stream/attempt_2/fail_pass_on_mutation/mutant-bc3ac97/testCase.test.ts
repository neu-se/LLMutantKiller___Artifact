import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with exactly 2 through streams", () => {
  it("should apply both through streams when pipeline is created with 2 transforms", (done) => {
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

    // length === 2, triggers case 2 in switch
    // mutated: falls through to case 3, ref[2] is undefined, addTen never applied
    const pipeline = pull(double, addTen);
    const piped = pipeline(source);

    const results: number[] = [];

    function drain() {
      piped(null, function(end: any, data: any) {
        if (end === true) {
          // Original: double then addTen => [12, 14, 16]
          // Mutated: only double applied (addTen skipped) => [2, 4, 6]
          expect(results).toEqual([12, 14, 16]);
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