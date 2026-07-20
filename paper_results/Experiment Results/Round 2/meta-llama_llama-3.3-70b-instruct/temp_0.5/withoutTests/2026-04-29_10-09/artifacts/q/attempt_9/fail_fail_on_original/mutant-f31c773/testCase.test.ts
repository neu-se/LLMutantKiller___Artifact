import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should call dispatch with correct arguments", async () => {
    const object = {
      dispatch: jest.fn((op, args) => {
        if (op === "set" && args.length === 2) {
          return;
        }
      }),
    };
    const key = "testKey";
    const value = "testValue";
    Q(object).set(key, value);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(object.dispatch).toHaveBeenCalledTimes(1);
    expect(object.dispatch).toHaveBeenCalledWith("set", [key, value]);
  });
});