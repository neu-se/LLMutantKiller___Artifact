import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should dispatch the set operation with the correct arguments", async () => {
    const object = {
      dispatch: jest.fn((op, args) => {
        if (op === "set" && args[0] === "testKey" && args[1] === "testValue") {
          return "success";
        }
      }),
    };
    const key = "testKey";
    const value = "testValue";
    const promise = Q(object).set(key, value);
    const result = await promise;
    expect(result).toBe("success");
  });
});