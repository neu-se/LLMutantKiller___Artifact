import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.finally", () => {
  it("should execute the finally callback after promise resolution", async () => {
    let finallyCalled = false;
    const promise = Q.resolve(42).finally(() => {
      finallyCalled = true;
    });
    await promise;
    expect(finallyCalled).toBe(true);
  });
});