const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly pass arguments to dispatch when setting a property", () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);

    // Spy on the dispatch method to verify it's called with correct arguments
    const dispatchSpy = jest.spyOn(promise, "dispatch");

    return promise.set("prop", "updated").then(() => {
      // Verify dispatch was called with correct arguments
      expect(dispatchSpy).toHaveBeenCalledWith("set", ["prop", "updated"]);
      expect(obj.prop).toBe("updated");
      dispatchSpy.mockRestore();
    });
  });
});