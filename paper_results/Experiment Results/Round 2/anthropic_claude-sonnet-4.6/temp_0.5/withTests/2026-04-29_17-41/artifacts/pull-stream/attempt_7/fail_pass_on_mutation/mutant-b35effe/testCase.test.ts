import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find", () => {
  it("should pass null error to callback when source ends immediately with no matches", (done) => {
    // Source that ends immediately (never emits any values)
    // This means the drain end callback fires with err=true right away
    const emptySource = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // immediately signal end of stream
    };

    const sink = find(
      () => true, // would match anything, but source is empty
      (err: any, result: any) => {
        // ended=false since no data was emitted, so we hit the placeholder line
        // Original: cb(true === true ? null : true, null) => cb(null, null)
        // Mutated:  cb(true !== true ? null : true, null) => cb(true, null)
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    );

    sink(emptySource);
  });
});