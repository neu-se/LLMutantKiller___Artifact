import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null as first argument when stream ends normally without a match", (done) => {
    let count = 0;
    
    // A simple pull-stream source that emits 3 values then ends normally
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      count++;
      if (count <= 3) {
        cb(null, count * 10);
      } else {
        cb(true); // normal end of stream
      }
    }

    const sink = find(
      (data: number) => data > 1000, // predicate that never matches
      (err: any, data: any) => {
        // Original: err should be null (err===true ? null : err => null)
        // Mutated:  err would be true  (err!==true ? null : err => true)
        expect(err).toBeNull();
        done();
      }
    );

    sink(source);
  });
});