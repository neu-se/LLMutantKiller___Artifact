import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should return a promise that resolves after the specified timeout", async () => {
    const start = Date.now();
    await Q.delay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(50);
  });
});