import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function", () => {
    const promise = Q({
      "when": function () {
        return "value";
      }
    });

    expect(promise.inspect).toBeDefined();
    expect(typeof promise.inspect).toBe("function");
  });
});