import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should receive null not true as error when no match found and stream ends", (done) => {
    // Source that immediately ends with true (normal termination)
    function emptySource(end: any, cb: Function) {
      if (end) {
        return cb(end);
      }
      // Immediately signal end of stream
      cb(true);
    }

    find(
      (data: any) => data === 42,
      (err: any, data: any) => {
        // In original: err===true ? null : err => null
        // In mutated:  false ? null : err => true (the actual err value)
        if (err === null) {
          done();
        } else {
          done(new Error(`Expected err to be null but got: ${JSON.stringify(err)}`));
        }
      }
    )(emptySource);
  });
});