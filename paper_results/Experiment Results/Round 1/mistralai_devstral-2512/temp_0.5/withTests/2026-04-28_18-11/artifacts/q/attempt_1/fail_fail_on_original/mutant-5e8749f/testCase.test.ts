import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should remove promise from unhandledRejections when handled", async () => {
    const error = new Error("test error");
    const promise = Q.reject(error);

    // Give time for the promise to be tracked as unhandled
    await Q.delay(10);

    // Handle the rejection
    promise.catch(() => {});

    // Give time for the untrackRejection to be called
    await Q.delay(10);

    // The promise should no longer be in unhandledRejections
    const unhandled = Q.getUnhandledReasons();
    expect(unhandled).toEqual([]);
  });
});