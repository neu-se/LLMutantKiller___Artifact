import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
  it("should reject with an error message containing \"Q can't join: not the same:\" when joining two different values", async () => {
    const promise = Q.join(Q("foo"), Q("bar"));
    
    let caughtError: Error | null = null;
    try {
      await promise;
    } catch (e) {
      caughtError = e as Error;
    }
    
    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toContain("Q can't join: not the same:");
  });
});