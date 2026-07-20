import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial sink with 5 args should process [1,2,3] through 4 addOne transforms to get [5,6,7]", (done) => {
    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data + 1);
      });
    };

    const results: number[] = [];

    const collectSink = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(results).toEqual([5, 6, 7]);
            done();
            return;
          }
          if (end) { done(end); return; }
          results.push(data);
          next();
        });
      };
      next();
    };

    const partialSink = pull(addOne, addOne, addOne, addOne, collectSink);

    let i = 0;
    const values = [1, 2, 3];
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    };

    partialSink(source);
  });
});