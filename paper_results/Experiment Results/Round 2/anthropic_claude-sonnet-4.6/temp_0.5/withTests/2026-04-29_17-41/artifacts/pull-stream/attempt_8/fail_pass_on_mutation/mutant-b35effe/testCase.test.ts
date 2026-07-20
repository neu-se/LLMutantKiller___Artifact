import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("find", () => {
  it("should pass null error when stream ends normally without finding a match", () => {
    return new Promise<void>((resolve, reject) => {
      // Source that ends immediately with true (normal end, no data)
      const emptySource = (abort: any, cb: Function) => {
        cb(true);
      };

      const sink = find(
        () => false, // never matches
        (err: any, result: any) => {
          try {
            // Original: err === true ? null : err  =>  null
            // Mutated:  err !== true ? null : err  =>  true
            expect(err).toBeNull();
            expect(result).toBeNull();
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      );

      // Call sink with source - drain should start pulling
      sink(emptySource);
    });
  });
});