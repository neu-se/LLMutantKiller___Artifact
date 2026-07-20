import { Q } from "./q";

describe("Q rejection tracking", () => {
  it("should untrack rejection when handler is attached", () => {
    const rejectionReason = new Error("test rejection");
    const rejectedPromise = Q.reject(rejectionReason);

    // Initially, the rejection should be tracked
    expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);

    // Attach a rejection handler
    rejectedPromise.catch(() => {
      // Handler attached
    });

    // After attaching handler, rejection should be untracked
    // This is where the mutation would fail - it doesn't call untrackRejection
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});