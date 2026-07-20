// test case to detect the mutation in the `any` function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any mutation test", () => {
  it("should reject when all promises are rejected", async () => {
    const deferreds = [Q.defer(), Q.defer()];
    const promises = [deferreds[0].promise, deferreds[1].promise];
    const resultPromise = Q.any(promises);

    // Reject all promises
    deferreds[0].reject(new Error("First rejection"));
    deferreds[1].reject(new Error("Second rejection"));

    // Wait for the result promise to settle
    await expect(resultPromise).rejects.toBeDefined();
    expect(resultPromise.inspect().state).toBe("rejected");
  });
});