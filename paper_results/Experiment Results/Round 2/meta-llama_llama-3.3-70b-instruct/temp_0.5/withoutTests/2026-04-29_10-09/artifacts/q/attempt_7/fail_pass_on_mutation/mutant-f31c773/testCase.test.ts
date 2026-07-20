import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should not throw an error when dispatch is called with correct arguments on original code", async () => {
    const object = {
      dispatch: jest.fn((op, args) => {
        if (op === "set" && args.length === 2) {
          return;
        } else {
          throw new Error("Dispatch called with incorrect arguments");
        }
      }),
    };
    const key = "testKey";
    const value = "testValue";
    const promise = Q(object).set(key, value);
    await expect(promise).resolves.not.toThrowError();
  });

  it.skip("should throw an error when dispatch is called with empty array on mutated code", async () => {
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