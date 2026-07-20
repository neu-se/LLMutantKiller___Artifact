import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join mutation test", () => {
  it("should resolve when two promises fulfill to the same value", async () => {
    const value = {};
    const promise1 = Q.resolve(value);
    const promise2 = Q.resolve(value);
    const result = await Q.join(promise1, promise2);
    expect(result).toBeUndefined();
  });
});