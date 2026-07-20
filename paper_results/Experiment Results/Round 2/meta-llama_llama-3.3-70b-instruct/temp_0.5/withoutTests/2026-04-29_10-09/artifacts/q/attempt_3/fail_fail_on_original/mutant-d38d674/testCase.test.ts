import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should reject when fallback is undefined", () => {
    const promise = Q.Promise({}, undefined);
    expect(promise.inspect().state).toBe("rejected");
  });
});