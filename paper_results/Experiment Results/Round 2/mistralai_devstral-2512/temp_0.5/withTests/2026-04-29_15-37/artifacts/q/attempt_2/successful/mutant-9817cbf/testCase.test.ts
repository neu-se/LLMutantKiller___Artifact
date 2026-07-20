import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejection behavior", () => {
  it("should reject with an Error when all promises are rejected", async () => {
    const deferreds = [Q.defer(), Q.defer()];
    const promises = [deferreds[0].promise, deferreds[1].promise];

    const promise = Q.any(promises);
    deferreds[0].reject(new Error("First error"));
    deferreds[1].reject(new Error("Second error"));

    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});