import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe("find - stream ends without match", () => {
  it("should call callback with null error when no item is found and stream ends normally", (done) => {
    // Use pull.values which ends with true (normal end)
    // Use a test function that never matches so we hit the end-of-stream branch
    pull(
      pull.values([1, 2, 3]),
      pull.find(
        (d: number) => d === 999, // never matches
        (err: any, result: any) => {
          // Original: err === true ? null : err => null
          // Mutated:  err !== true ? null : err => true (bug!)
          // So on mutated code, err would be `true`, not null
          expect(err).toBeNull();
          expect(result).toBeNull();
          done();
        }
      )
    );
  });
});