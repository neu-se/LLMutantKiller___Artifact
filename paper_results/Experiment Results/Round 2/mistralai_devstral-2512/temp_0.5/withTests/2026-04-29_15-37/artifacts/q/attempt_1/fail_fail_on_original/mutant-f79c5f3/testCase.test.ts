import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior with multiple rejections", () => {
  it("should reject when all promises are rejected (mutation test)", async () => {
    const deferreds = [Q.defer(), Q.defer(), Q.defer()];
    const promises = deferreds.map(d => d.promise);

    const resultPromise = Q.any(promises);

    // Reject all promises
    deferreds.forEach((d, index) => {
      setTimeout(() => d.reject(new Error(`Rejection ${index}`)), 10 * (index + 1));
    });

    // Wait for all rejections to be processed
    await new Promise(resolve => setTimeout(resolve, 100));

    // The promise should be rejected
    await expect(resultPromise).rejects.toBeDefined();
  });
});