import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("fulfills with the value of the first resolved promise", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const anyPromise = Q.any(promises);

    deferred1.resolve("first");
    deferred2.resolve("second");

    const result = await anyPromise;
    expect(result).toBe("first");
  });
});