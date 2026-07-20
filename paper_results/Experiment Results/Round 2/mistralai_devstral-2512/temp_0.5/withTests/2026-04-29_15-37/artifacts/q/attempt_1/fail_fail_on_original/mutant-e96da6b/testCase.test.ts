import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should delay fulfillment when given a time argument", async () => {
    const startTime = Date.now();
    const delayTime = 50;
    const promise = Q.delay(delayTime);
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(delayTime);
    await promise;
    const finalTime = Date.now();
    expect(finalTime - startTime).toBeGreaterThanOrEqual(delayTime);
  });
});