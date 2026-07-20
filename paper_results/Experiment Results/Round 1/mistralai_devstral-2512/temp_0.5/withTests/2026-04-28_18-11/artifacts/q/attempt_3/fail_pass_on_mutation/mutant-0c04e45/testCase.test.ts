import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator mutation test", () => {
  it("should correctly handle generator exceptions in SpiderMonkey-style generators", async () => {
    // This test targets the mutation in the async function where
    // the try-catch block was emptied, which would prevent proper
    // exception handling in SpiderMonkey-style generators

    const testGenerator = Q.async(function* () {
      throw new Error("test error");
    });

    let errorCaught = false;
    try {
      await testGenerator();
    } catch (e) {
      errorCaught = true;
      expect(e.message).toBe("test error");
    }

    expect(errorCaught).toBe(true);
  });
});