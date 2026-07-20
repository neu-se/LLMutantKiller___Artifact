import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find - stream ends without match", () => {
  it("should call callback with null error (not true) when no item is found and stream ends normally", (done) => {
    const values = [1, 2, 3];
    let i = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[i++]);
    };

    const sink = find(
      (d: number) => d === 99, // never matches any value
      (err: any, result: any) => {
        // Original code: err === true ? null : err => null (stream ended normally with true)
        // Mutated code: err !== true ? null : err => true (passes true as error!)
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    );

    sink(source);
  });
});