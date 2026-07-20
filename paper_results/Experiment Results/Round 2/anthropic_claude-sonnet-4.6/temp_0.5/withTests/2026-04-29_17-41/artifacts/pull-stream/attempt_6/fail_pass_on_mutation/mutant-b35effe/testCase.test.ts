import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("find", () => {
  it("should invoke callback with null as first argument when stream ends without a match", (done) => {
    const source = values([10, 20, 30]);
    
    // Create a sink using find directly from sinks/find.js
    const sink = find(
      (d: number) => d === 999, // never matches
      (err: any, result: any) => {
        // Original: cb(err === true ? null : err, null) => cb(null, null)
        // Mutated:  cb(err !== true ? null : err, null) => cb(true, null)
        if (err !== null) {
          return done(new Error(`err should be null but was: ${String(err)}`));
        }
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    );

    sink(source);
  });
});