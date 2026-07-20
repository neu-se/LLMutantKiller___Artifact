import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("find sink", () => {
  it("should pass null (not true) to callback when stream ends normally without a match", (done) => {
    // Pull-stream source: emits 1, 2, 3 then ends
    let i = 0;
    const values = [1, 2, 3];
    
    function source(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      if (i >= values.length) {
        cb(true); // normal end
        return;
      }
      cb(null, values[i++]);
    }

    // Look for something that doesn't exist
    const sink = find(
      (data: any) => data === 999,
      (err: any, data: any) => {
        // Original code: err===true ? null : err => null
        // Mutated code:  false ? null : err => true
        if (err === null) {
          done();
        } else {
          done(new Error(`Expected err to be null but got: ${JSON.stringify(err)}`));
        }
      }
    );

    sink(source);
  });
});