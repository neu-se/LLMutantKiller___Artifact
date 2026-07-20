import { Q } from "./q.js";

describe("Q.delay", () => {
  it("should delay the resolution of a promise by the specified timeout", async () => {
    const start = Date.now();
    await Q.delay(100);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(100);
  });
});