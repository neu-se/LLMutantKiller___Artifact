import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink default case", () => {
  it("should correctly pipe source through 5 through-streams in partial sink pattern", () => {
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (e: any, data: number) => {
        if (e) return cb(e);
        cb(null, data + 1);
      });
    };

    let i = 0;
    const values = [0];
    const simpleSource = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // 5 args → length=5 → default case needed when partial sink is called
    const partialSink = pull(addOne, addOne, addOne, addOne, addOne);
    const piped = partialSink(simpleSource);

    const results: number[] = [];
    piped(null, function next(end: any, data: number) {
      if (end === true) return;
      if (end) throw end;
      results.push(data);
      piped(null, next);
    });

    // 0 + 5 addOnes = 5
    expect(results).toEqual([5]);
  });
});