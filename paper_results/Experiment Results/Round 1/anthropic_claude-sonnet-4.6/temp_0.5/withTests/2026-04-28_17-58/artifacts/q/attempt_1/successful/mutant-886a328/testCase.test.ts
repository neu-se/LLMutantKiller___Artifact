import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.noConflict error message", () => {
  it("should throw an error with the message 'Q.noConflict only works when Q is used as a global' when called in Node environment", () => {
    let thrownError: Error | null = null;
    try {
      Q.noConflict();
    } catch (e) {
      thrownError = e as Error;
    }
    expect(thrownError).not.toBeNull();
    expect(thrownError!.message).toBe("Q.noConflict only works when Q is used as a global");
  });
});