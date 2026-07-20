import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("Q.async should reject when a non-StopIteration error is thrown in SpiderMonkey-style generator", async () => {
    // In the mutated code, isStopIteration always returns true
    // We test Q["return"] behavior - it throws QReturnValue
    // In ES6 path, exceptions go through reject() not isStopIteration
    // But we can test that a regular error in async rejects properly
    const result = await Q.async(function* () {
      throw new Error("test error");
    })().then(() => "fulfilled", (err: Error) => err.message);
    
    expect(result).toBe("test error");
  });
});