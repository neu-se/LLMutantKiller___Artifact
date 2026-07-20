import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly untrack handled rejections when at !== -1", async () => {
    // Create multiple rejected promises
    const promise1 = Q.reject(new Error("Error 1"));
    const promise2 = Q.reject(new Error("Error 2"));
    const promise3 = Q.reject(new Error("Error 3"));

    // Wait for them to be tracked
    await Q.delay(10);

    // Verify all are tracked
    let unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(3);

    // Handle only the second promise
    promise2.catch(() => {});

    // Wait for the handler to execute
    await Q.delay(10);

    // Only one should be untracked (the handled one)
    unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(2);
  });
});