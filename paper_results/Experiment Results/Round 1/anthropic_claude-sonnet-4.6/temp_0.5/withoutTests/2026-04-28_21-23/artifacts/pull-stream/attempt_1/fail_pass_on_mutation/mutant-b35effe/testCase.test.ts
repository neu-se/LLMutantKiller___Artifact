import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when stream ends without finding a match", (done) => {
    // Create a simple pull-stream source that emits values and ends
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      // Emit a few values then end
      static_count++;
      if (static_count <= 3) {
        cb(null, static_count);
      } else {
        cb(true); // normal end of stream
      }
    }

    let static_count = 0;

    const sink = find(
      (data: number) => data > 100, // test that never matches
      (err: any, data: any) => {
        // When no match is found and stream ends normally,
        // err should be null (not true)
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      }
    );

    sink(source);
  });
});