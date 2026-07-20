import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink", () => {
  it("should correctly pipe values through a partial sink without appending undefined", (done) => {
    // double is a through stream (function with length === 1)
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data * 2);
      });
    };

    const results: number[] = [];

    const collectSink = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            expect(results).toEqual([2, 4, 6]);
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

    // pull(double, collectSink) creates a partial sink because double.length === 1
    // With mutation: args = [double, collectSink, undefined] instead of [double, collectSink]
    // When called with source, it becomes pull(source, double, collectSink, undefined)
    // undefined as a stream component causes a TypeError
    const partialSink = pull(double, collectSink);
    expect(typeof partialSink).toBe("function");
    expect(partialSink.length).toBe(1);

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