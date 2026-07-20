import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all behavior with fulfilled promises", () => {
  it("should not await already fulfilled promises", async () => {
    const fulfilledPromise = Q(42);
    const promises = [fulfilledPromise];

    // Create a spy to track if the promise is being awaited unnecessarily
    let callbackInvoked = false;
    const originalThen = fulfilledPromise.then;
    fulfilledPromise.then = function() {
      callbackInvoked = true;
      return originalThen.apply(this, arguments);
    };

    const result = await Q.all(promises);

    // In the original code, fulfilled promises should not trigger then callbacks
    // In the mutated code, they would be treated as pending and trigger callbacks
    expect(result).toEqual([42]);
    expect(callbackInvoked).toBe(false);
  });
});