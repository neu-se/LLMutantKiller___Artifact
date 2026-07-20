import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", () => {
  it("should return the fulfilled value of a fulfilled promise", async () => {
    const fulfilledPromise = Q(42);
    const result = Q.nearer(fulfilledPromise);
    expect(result).toBe(42);
  });
});