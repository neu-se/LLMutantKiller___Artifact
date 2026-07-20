import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout error message", () => {
  it("should include 'ms' unit in the timeout error message", async () => {
    const timeoutMs = 10;
    const delayMs = 50;

    const delayedPromise = Q.delay(delayMs);
    const timedOutPromise = delayedPromise.timeout(timeoutMs);

    await expect(timedOutPromise).rejects.toThrowError(/Timed out after \d+ ms/);
  });
});