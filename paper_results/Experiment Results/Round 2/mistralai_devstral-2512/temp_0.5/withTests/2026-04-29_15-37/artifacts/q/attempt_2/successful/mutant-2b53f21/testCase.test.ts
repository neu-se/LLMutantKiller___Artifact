import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("rejection tracking", () => {
  it("should untrack rejection when a rejected promise is handled", async () => {
    const error = new Error("test error");
    const rejectedPromise = Q.reject(error);

    // Add a handler to the rejected promise
    const handledPromise = rejectedPromise.catch(() => {});

    // Wait for the promise to settle
    await handledPromise;

    // Verify that the rejection was untracked
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons).toEqual([]);
  });
});