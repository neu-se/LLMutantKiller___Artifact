import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.reject unhandled rejection tracking", () => {
  it("should untrack rejection when handler is attached", async () => {
    const rejectionReason = new Error("test rejection");
    const rejectedPromise = Q.reject(rejectionReason);

    // Give the unhandled rejection tracking time to register
    await new Promise(resolve => setTimeout(resolve, 10));

    // Attach a rejection handler
    let handlerCalled = false;
    rejectedPromise.catch((e: Error) => {
      handlerCalled = true;
      return null;
    });

    // Wait for the handler to be processed
    await new Promise(resolve => setTimeout(resolve, 10));

    // The rejection should be untracked after handler is attached
    const unhandled = Q.getUnhandledReasons();
    expect(unhandled).toHaveLength(0);
    expect(handlerCalled).toBe(true);
  });
});