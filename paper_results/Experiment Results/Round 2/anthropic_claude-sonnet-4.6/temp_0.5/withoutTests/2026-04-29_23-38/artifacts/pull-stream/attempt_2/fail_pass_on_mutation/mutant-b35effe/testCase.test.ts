import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with null error when no match is found and stream ends normally", (done) => {
    const values = [1, 2, 3];
    let index = 0;
    
    // Pull-stream source: called with (end, cb)
    const source = (end: any, cb: Function) => {
      if (end) {
        return cb(end);
      }
      if (index >= values.length) {
        // Signal natural end of stream with true
        return cb(true);
      }
      cb(null, values[index++]);
    };
    
    // find with a predicate that never matches
    const sink = find((x: number) => x > 1000, (err: any, data: any) => {
      // Original: err === null (because err===true maps to null)
      // Mutated: err === true (because err!==true is false, so it passes err=true through)
      if (err === null) {
        done();
      } else {
        done(new Error(`Expected err to be null but got: ${err}`));
      }
    });
    
    sink(source);
  });
});