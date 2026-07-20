import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
  it("should delay fulfillment when called with a single time argument", async () => {
    const startTime = Date.now();
    const delayTime = 50;
    const promise = Q.delay(delayTime);
    const result = await promise;
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(delayTime - 5);
    expect(endTime - startTime).toBeLessThan(delayTime + 20);
    expect(result).toBeUndefined();
  });
});