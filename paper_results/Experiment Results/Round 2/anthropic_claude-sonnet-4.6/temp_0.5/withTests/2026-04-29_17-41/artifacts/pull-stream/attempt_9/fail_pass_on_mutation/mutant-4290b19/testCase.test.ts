import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should pipe [1,2,3] through 4 addOne transforms to produce [5,6,7] via partial sink", (done) => {
    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data + 1);
      });
    };

    const results: number[] = [];
    const collectSink = (read: Function) => {
      (function next() {
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(results).toEqual([5, 6, 7]);
            done();
          } else if (end) {
            done(end);
          } else {
            results.push(data);
            next();
          }
        });
      })();
    };

    const partialSink = pull(addOne, addOne, addOne, addOne, collectSink);

    let i = 0;
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      if (i >= 3) return cb(true);
      cb(null, ++i);
    };

    partialSink(source);
  });
});