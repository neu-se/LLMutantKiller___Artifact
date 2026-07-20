import { Q } from "./q.js";

describe("Q promise rejection behavior", () => {
  it("should properly handle promise rejection in finally", async () => {
    let errorThrown = false;
    const testError = new Error("test error");

    await Q.reject(testError)
      .finally(() => {
        throw new Error("finally error");
      })
      .catch((e) => {
        errorThrown = true;
      });

    expect(errorThrown).toBe(true);
  });
});