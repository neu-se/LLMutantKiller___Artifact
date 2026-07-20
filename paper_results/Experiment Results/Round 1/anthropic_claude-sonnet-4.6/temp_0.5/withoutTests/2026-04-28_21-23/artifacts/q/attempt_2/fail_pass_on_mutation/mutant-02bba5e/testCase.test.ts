import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q rejection with null reason", () => {
  it("should propagate null as rejection reason through then handler", async () => {
    let capturedReason: any = "not-set";
    
    await Q.reject(null).then(null, (reason: any) => {
      capturedReason = reason;
    });

    // Original: capturedReason is null
    // Mutated: makeStackTraceLong throws TypeError accessing null.stack,
    // _rejected throws, caught by outer try/catch, capturedReason becomes TypeError
    expect(capturedReason).toBeNull();
  });
});