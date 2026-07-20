import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull case 2 mutation", () => {
  it("partial sink with 2 throughs should return a readable stream when invoked, not undefined", (done) => {
    const through1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data + 1);
      });
    };

    const through2 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data * 3);
      });
    };

    // Partial sink with exactly 2 throughs (hits case 2)
    const pipeline = pull(through1, through2);

    let i = 0;
    const values = [1, 2, 3, 4, 5];

    // Normal source with length 2
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const read = pipeline(src);

    // Verify it returns a readable function
    expect(typeof read).toBe("function");

    const results: number[] = [];

    function drain() {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // through1: +1, through2: *3
          // [1->2->6, 2->3->9, 3->4->12, 4->5->15, 5->6->18]
          expect(results).toEqual([6, 9, 12, 15, 18]);
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