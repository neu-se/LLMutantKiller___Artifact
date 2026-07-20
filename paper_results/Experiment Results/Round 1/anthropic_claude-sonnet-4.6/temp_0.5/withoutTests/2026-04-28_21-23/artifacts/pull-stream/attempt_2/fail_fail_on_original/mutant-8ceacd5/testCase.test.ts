import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial sink default case", () => {
  it("should throw or produce wrong results when partial sink with 5 args loses read source", () => {
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (e: any, data: number) => {
        if (e) return cb(e);
        cb(null, data + 1);
      });
    };

    // Create partial sink with 5 through functions (triggers default case)
    const partialSink = pull(addOne, addOne, addOne, addOne, addOne);

    let i = 0;
    const values = [1, 2, 3];
    const simpleSource = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // On mutated code, read (simpleSource) won't be unshifted into ref,
    // so pull.apply(null, [addOne, addOne, addOne, addOne, addOne]) is called
    // without simpleSource, causing addOne to be treated as the source
    // which should throw or produce incorrect behavior
    expect(() => {
      const piped = partialSink(simpleSource);
      const results: number[] = [];
      piped(null, function next(end: any, data: number) {
        if (end === true) return;
        if (end) throw end;
        results.push(data);
        piped(null, next);
      });
    }).not.toThrow();

    i = 0;
    const results: number[] = [];
    const piped = partialSink(simpleSource);
    piped(null, function next(end: any, data: number) {
      if (end === true) return;
      if (end) throw end;
      results.push(data);
      piped(null, next);
    });
    expect(results).toEqual([6, 7, 8]);
  });
});