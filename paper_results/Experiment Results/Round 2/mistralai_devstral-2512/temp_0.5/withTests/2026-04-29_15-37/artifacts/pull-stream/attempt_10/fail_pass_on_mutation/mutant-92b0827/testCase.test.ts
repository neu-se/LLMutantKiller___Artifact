import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce with immediate end and no initial value", () => {
  it("should callback with null when stream ends immediately with true", (done) => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End immediately with true
    };

    pull(
      source,
      reduce((acc: any, data: any) => acc + data, (err: any, result: any) => {
        // The mutation changes the behavior when end is true
        // Original: cb(end === true ? null : end)
        // Mutated: cb(true ? null : end)
        // This test verifies the original behavior
        expect(err).toBeNull();
        expect(result).toBeUndefined();
        done();
      })
    );
  });
});