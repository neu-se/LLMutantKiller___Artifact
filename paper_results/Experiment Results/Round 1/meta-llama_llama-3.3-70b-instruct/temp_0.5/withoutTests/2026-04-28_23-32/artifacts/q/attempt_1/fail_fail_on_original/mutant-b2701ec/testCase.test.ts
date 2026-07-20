import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function", () => {
    const promise = Q(Promise({
      "when": function () {
        return "value";
      },
      "get": function (name) {
        return "value";
      },
      "set": function (name, rhs) {
        return "value";
      },
      "delete": function (name) {
        return "value";
      },
      "post": function (name, args) {
        return "value";
      },
      "apply": function (thisp, args) {
        return "value";
      },
      "keys": function () {
        return ["key"];
      }
    }, void 0, function inspect() {
      return { state: "fulfilled", value: "value" };
    }));

    expect(promise.inspect).toBeDefined();
    expect(typeof promise.inspect).toBe("function");
  });
});