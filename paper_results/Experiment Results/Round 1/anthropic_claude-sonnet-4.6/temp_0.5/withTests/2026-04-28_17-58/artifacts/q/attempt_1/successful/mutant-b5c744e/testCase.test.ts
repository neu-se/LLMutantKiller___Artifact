import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
  it("should fulfill with the first resolved promise when one promise fulfills", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    const anyPromise = Q.any(promises);

    deferred1.resolve("first");

    await Q.delay(100);

    expect(anyPromise.isFulfilled()).toBe(true);
    expect(anyPromise.inspect().value).toBe("first");
  });
});