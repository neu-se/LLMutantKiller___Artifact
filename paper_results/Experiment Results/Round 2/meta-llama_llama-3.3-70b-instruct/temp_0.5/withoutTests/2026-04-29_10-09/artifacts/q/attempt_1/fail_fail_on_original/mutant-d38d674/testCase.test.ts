import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should create a promise with a fallback function", () => {
    const promise = Q.Promise({}, undefined);
    expect(promise.inspect().state).toBe("unknown");
  });
});