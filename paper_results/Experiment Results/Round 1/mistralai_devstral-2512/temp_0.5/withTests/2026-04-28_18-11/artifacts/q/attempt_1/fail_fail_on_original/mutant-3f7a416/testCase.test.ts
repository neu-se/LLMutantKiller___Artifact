import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("allSettled mutation test", () => {
  it("should resolve with inspection states of all promises", async () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));
    const promises = [fulfilledPromise, rejectedPromise, 10];

    const result = await Q.allSettled(promises);

    expect(result).toEqual([
      { state: "fulfilled", value: 42 },
      { state: "rejected", reason: new Error("test error") },
      { state: "fulfilled", value: 10 }
    ]);
  });
});