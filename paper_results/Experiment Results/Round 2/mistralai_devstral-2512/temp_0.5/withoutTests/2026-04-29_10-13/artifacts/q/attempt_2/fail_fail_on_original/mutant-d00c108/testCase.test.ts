import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first settled promise", async () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const fastPromise = delay(10).then(() => "fast");
    const slowPromise = delay(100).then(() => "slow");

    const result = await Q.race([fastPromise, slowPromise]);
    expect(result).toBe("fast");
  });
});