import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial application with exactly 2 through streams (case 2)", () => {
  it("should correctly pipe through 2 transforms when using partial sink pattern", (done) => {
    // Create two simple through-stream factories
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data * 2);
      });
    };

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data + 1);
      });
    };

    // pull(double, addOne) creates a partial sink with length === 2
    // This hits case 2 in the switch statement
    const pipeline = pull(double, addOne);

    // Should be a partial sink function
    expect(typeof pipeline).toBe("function");
    expect(pipeline.length).toBe(1);

    // Provide a source
    let idx = 0;
    const values = [1, 2, 3];
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (idx >= values.length) return cb(true);
      cb(null, values[idx++]);
    };

    // Connect the source to the partial pipeline
    const read = pipeline(src);

    // Collect results manually
    const results: number[] = [];
    function drain() {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // double then addOne: [1->3, 2->5, 3->7]
          expect(results).toEqual([3, 5, 7]);
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