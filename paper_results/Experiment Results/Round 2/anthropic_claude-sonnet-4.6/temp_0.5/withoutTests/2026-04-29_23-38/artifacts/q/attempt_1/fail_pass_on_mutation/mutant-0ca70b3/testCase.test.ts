import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should preserve non-internal stack frames when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    const error = new Error("test error");
    
    const result = await Q.reject(error)
      .then(null, function (err: Error) {
        return err;
      });

    // With the original code, filterStackString iterates through lines and
    // preserves non-internal frames, so the stack should be non-empty.
    // With the mutated code, the loop never runs (i >= lines.length is false
    // for non-empty arrays), so filterStackString returns "" and the stack
    // gets set to an empty string.
    expect(result.stack).toBeTruthy();
    expect(result.stack!.length).toBeGreaterThan(0);
  });
});