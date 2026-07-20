import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find - stream ends without match", () => {
  it("should call callback with null error when no item is found and stream ends normally", (done) => {
    const values = [1, 2, 3];
    let i = 0;

    // A source that emits values then ends with true
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true); // normal end of stream
        return;
      }
      cb(null, values[i++]);
    };

    // find with a test that never matches - so the stream ends without finding anything
    // This triggers the `cb(err === true ? null : err, null)` branch
    const sink = find(
      (d: number) => d === 999,
      (err: any, result: any) => {
        // Original: err === true ? null : err  => null when stream ends normally
        // Mutated:  err !== true ? null : err  => true when stream ends normally
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    );

    // Manually drive the sink by connecting source to it
    sink(source);
  });
});