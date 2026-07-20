import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink with 5+ arguments", () => {
  it("should correctly pipe values through a partial sink with 5 throughs without appending undefined", (done) => {
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
            expect(results).toEqual([6, 7, 8]);
            done();
            return;
          }
          if (end) {
            done(end);
            return;
          }
          results.push(data);
          next();
        });
      };
      next();
    };

    // 5 arguments: addOne x4 + collectSink → hits the `default` case in the switch
    // Mutated: args = [addOne, addOne, addOne, addOne, collectSink, undefined]
    // ref.unshift(source) → [source, addOne, addOne, addOne, addOne, collectSink, undefined]
    // pull.apply(null, ref) passes undefined as 7th arg, causing TypeError
    const partialSink = pull(addOne, addOne, addOne, addOne, collectSink);
    expect(typeof partialSink).toBe("function");

    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    };

    partialSink(source);
  });
});