import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should correctly expose valueOf on fulfilled promises", () => {
    const fulfilledPromise = Q.resolve(42);
    expect(fulfilledPromise.valueOf()).toBe(42);
  });
});