import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function that returns state as unknown when inspect is not provided", () => {
    const promise = Q(Promise({
      "when": function (fulfilled) {
        fulfilled("value");
      }
    }, function fallback(op, args) {
      return Q("value");
    }));

    const inspect = promise.inspect();
    expect(inspect).toBeDefined();
    expect(typeof inspect).toBe("object");
    expect(inspect.state).not.toBe("unknown");
  });
});