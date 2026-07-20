import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should not set exception property for fulfilled promises", () => {
    const promise = Q.resolve("test");
    const inspected = promise.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(promise.exception).toBeUndefined();
    const promise2 = Q.reject("error");
    const inspected2 = promise2.inspect();
    expect(inspected2.state).toBe("rejected");
    expect(promise2.exception).toBeDefined();
  });
});