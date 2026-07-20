import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function", () => {
    const promise = Q(Promise({
      "when": function () {
        return "value";
      }
    }, void 0, function inspect() {
      return { state: "fulfilled", value: "value" };
    }));

    expect(promise.inspect).toBeDefined();
    expect(typeof promise.inspect).toBe("function");
    expect(promise.inspect()).toEqual({ state: "unknown" });
  });
});