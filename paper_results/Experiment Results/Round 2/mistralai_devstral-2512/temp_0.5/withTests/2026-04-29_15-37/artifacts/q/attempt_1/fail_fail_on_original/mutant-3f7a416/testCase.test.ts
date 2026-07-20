import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.allSettled", () => {
  it("should resolve with an array of promise states when called on a promise for an array of promises", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(new Error("test error")),
      Promise.resolve(2)
    ];
    const result = await Q.all(promises).allSettled();
    expect(result).toEqual([
      { state: "fulfilled", value: 1 },
      { state: "rejected", reason: new Error("test error") },
      { state: "fulfilled", value: 2 }
    ]);
  });
});