const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with mixed promises", () => {
  it("should handle already fulfilled promises correctly in Q.all", async () => {
    const fulfilledPromise = Q(1);
    const pendingPromise = Q.defer().promise;
    const promises = [fulfilledPromise, pendingPromise];

    // The original code should resolve immediately for fulfilled promises
    // while the mutated code would incorrectly treat them as pending
    const resultPromise = Q.all(promises);

    // Give some time for the async operations
    await new Promise(resolve => setTimeout(resolve, 10));

    // The result should still be pending since one promise is pending
    expect(resultPromise.isPending()).toBe(true);
  });
});