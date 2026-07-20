import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial application pipeline with 2 throughs should collect correct values", (done) => {
    const results: number[] = [];

    // Use 2 arguments - triggers partial branch (a.length===1 since first arg is a function with 1 param)
    // length=2, so new Array(2) vs new Array() - after loop both have 2 elements
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const addTen = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 10);
      });
    };

    // double.length === 1, triggers partial branch with length=2
    const partial = pull(double, addTen);

    let i = 0;
    const values = [1, 2, 3];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const read = partial(source);

    function drain() {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual([12, 14, 16]);
          done();
          return;
        }
        results.push(data);
        drain();
      });
    }
    drain();
  });
});