import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function that returns state as unknown", () => {
    const promise = Q(Promise({
      "when": function (fulfilled) {
        fulfilled("value");
      }
    }, function fallback(op, args) {
      if (op === "when") {
        return Q("value");
      }
    }, function inspect() {
      return { state: "unknown" };
    }));

    const inspect = promise.inspect();
    expect(inspect).toBeDefined();
    expect(typeof inspect).toBe("object");
    expect(inspect.state).toBe("unknown");
  });
});