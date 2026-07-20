import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should not set exception property for fulfilled promises", () => {
    const promise = Q.resolve("test");
    const inspected = promise.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.exception).toBeUndefined();
  });
});