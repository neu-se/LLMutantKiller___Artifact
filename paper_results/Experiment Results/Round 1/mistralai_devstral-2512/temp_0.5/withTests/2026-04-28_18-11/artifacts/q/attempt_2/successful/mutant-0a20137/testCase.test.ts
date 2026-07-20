import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
  it("should join two values and return a promise that resolves if they are the same", async () => {
    const value = 42;
    const result = await Q.join(value, value);
    expect(result).toBe(value);
  });
});