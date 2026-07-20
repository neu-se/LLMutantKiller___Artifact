import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify error message", () => {
  it("throws an error with the correct message when wrapping an undefined function", () => {
    let thrownError: Error | null = null;
    
    try {
      // Directly invoke the internal throw by patching - but we can't.
      // Instead, we test the observable behavior by calling denodeify with undefined
      // and checking the error message thrown.
      Q.denodeify(undefined as any);
    } catch (e) {
      thrownError = e as Error;
    }
    
    expect(thrownError).not.toBeNull();
    expect(thrownError!.message).toBe("Q can't wrap an undefined function");
  });
});