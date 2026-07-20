import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should not set exception property for fulfilled promises", () => {
    const promise = Q.resolve("test");
    const inspected = promise.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(promise.exception).toBeUndefined();
  });

  it("should set exception property for rejected promises", () => {
    const promise = Q.reject("test");
    const inspected = promise.inspect();
    expect(inspected.state).toBe("rejected");
    expect(promise.exception).toBe("test");
  });
});