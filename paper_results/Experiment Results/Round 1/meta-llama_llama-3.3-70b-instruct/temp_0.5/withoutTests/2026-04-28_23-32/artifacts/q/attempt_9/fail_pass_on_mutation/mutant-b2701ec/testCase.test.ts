import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should create a promise with inspect function", () => {
    const promise = Q("value");
    const inspect = promise.inspect();
    expect(inspect).toBeDefined();
    expect(typeof inspect).toBe("object");
    expect(inspect.state).toBe("fulfilled");
  });
});