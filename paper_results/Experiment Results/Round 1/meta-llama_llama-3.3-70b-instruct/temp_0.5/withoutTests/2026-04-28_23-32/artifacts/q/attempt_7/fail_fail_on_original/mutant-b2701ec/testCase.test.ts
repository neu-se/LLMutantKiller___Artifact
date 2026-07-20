import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function that returns state as unknown when inspect is provided", () => {
    const promise = Q({
      "when": function () {
        return "value";
      }
    }, void 0, function inspect() {
      return { state: "unknown" };
    });

    const inspect = promise.inspect();
    expect(inspect).toBeDefined();
    expect(typeof inspect).toBe("object");
    expect(inspect.state).toBe("unknown");
  });
});