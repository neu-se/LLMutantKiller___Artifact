import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get static method", () => {
  it("should retrieve a named property from an object using Q.get", async () => {
    const obj = { answer: 42, name: "hello" };
    const result = await Q.get(obj, "answer");
    expect(result).toBe(42);
  });
});