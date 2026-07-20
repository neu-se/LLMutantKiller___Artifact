import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when stream ends normally without finding a match", (done) => {
    // Create a simple pull-stream source that emits some values and ends
    const values = [1, 2, 3];
    let index = 0;
    
    // A pull-stream source function
    const source = (end: any, cb: Function) => {
      if (end) {
        return cb(end);
      }
      if (index >= values.length) {
        return cb(true); // stream ended naturally
      }
      cb(null, values[index++]);
    };
    
    // Use find with a test that never matches
    const sink = find((x: number) => x > 100, (err: any, data: any) => {
      try {
        // In original: err should be null (because stream ended with true, which means normal end)
        // In mutated: err would be true (because err !== true is false when err === true)
        expect(err).toBeNull();
        expect(data).toBeNull();
        done();
      } catch (e) {
        done(e);
      }
    });
    
    // Connect source to sink
    sink(source);
  });
});