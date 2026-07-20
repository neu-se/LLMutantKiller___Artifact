import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not untrack a rejection when the promise is not in the unhandledRejections array", () => {
    const promise = Q.reject(new Error("test error"));
    // Force the promise to be handled to trigger untrackRejection
    promise.catch(() => {});
    // The mutation would cause untrackRejection to always return early
    // In the original code, it should properly check if the promise is in the array
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});