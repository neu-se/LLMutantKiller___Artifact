import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("finally callback validation", () => {
  it("should accept valid callback function", async () => {
    const promise = Q.resolve(42);
    let callbackInvoked = false;

    await promise.fin(() => {
      callbackInvoked = true;
    });

    expect(callbackInvoked).toBe(true);
  });
});