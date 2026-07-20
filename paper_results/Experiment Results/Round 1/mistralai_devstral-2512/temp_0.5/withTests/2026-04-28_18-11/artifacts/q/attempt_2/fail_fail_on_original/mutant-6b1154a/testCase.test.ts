import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with fulfilled callback", async () => {
    let fulfilledCalled = false;
    const promise = Q("test value");
    promise.done((value: any) => {
      fulfilledCalled = true;
    });
    await Q.delay(10);
    expect(fulfilledCalled).toBe(true);
  });
});