import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should not set the property when dispatch is called with empty array", async () => {
    const object = {
      dispatch: jest.fn((op, args) => {
        if (op === "set" && args.length === 0) {
          throw new Error("Dispatch called with empty array");
        }
      }),
    };
    const key = "testKey";
    const value = "testValue";
    const promise = Q(object).set(key, value);
    await expect(promise).rejects.toThrowError("Dispatch called with empty array");
  });
});