import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink with exactly 2 through streams", () => {
  it("should not throw or produce undefined when partial sink has exactly 2 transforms", (done) => {
    // Two simple through-stream transforms
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

    // Creates a partial sink with length === 2, hitting case 2 in the switch
    const pipeline = pull(double, addOne);

    let idx = 0;
    const values = [1, 2, 3];
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (idx >= values.length) return cb(true);
      cb(null, values[idx++]);
    };

    // In the mutated code, case 2 falls through to case 3:
    // pull(read, ref[0], ref[1], ref[2]) where ref[2] is undefined
    // Passing undefined as a stream argument causes s to be undefined,
    // and the loop does nothing for it, so addOne is never applied.
    // Results would be [2, 4, 6] instead of [3, 5, 7].
    const read = pipeline(src);

    const results: number[] = [];
    function drain() {
      read(null, (end: any, data: any) => {
        if (end === true) {
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