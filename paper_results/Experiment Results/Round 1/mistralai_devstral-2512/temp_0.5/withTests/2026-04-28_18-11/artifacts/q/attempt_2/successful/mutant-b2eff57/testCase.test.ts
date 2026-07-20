import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with a proper Error object when all promises are rejected with null", async () => {
    const deferreds = [Q.defer(), Q.defer()];
    const promises = [deferreds[0].promise, deferreds[1].promise];

    const promise = Q.any(promises);
    deferreds[0].reject(null);
    deferreds[1].reject(null);

    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});