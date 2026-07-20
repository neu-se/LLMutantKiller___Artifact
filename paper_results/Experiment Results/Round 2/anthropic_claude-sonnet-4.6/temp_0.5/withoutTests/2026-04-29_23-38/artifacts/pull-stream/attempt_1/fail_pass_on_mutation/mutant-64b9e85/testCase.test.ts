import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when stream ends without finding a match", (done) => {
    // Create a simple pull-stream source that emits values and then ends
    function source(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      // End the stream normally (true signals end in pull-stream)
      cb(true);
    }

    const sink = find(
      (data: any) => data === "notfound",
      (err: any, data: any) => {
        // In the original code, err should be null (because err===true means normal end)
        // In the mutated code, err would be true (because false ? null : err always returns err)
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      }
    );

    sink(source);
  });
});