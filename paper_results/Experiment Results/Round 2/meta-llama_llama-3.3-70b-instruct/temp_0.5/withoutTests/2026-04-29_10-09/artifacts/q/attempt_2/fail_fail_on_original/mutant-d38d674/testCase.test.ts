import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should reject when fallback is not undefined", () => {
    const promise = Q.Promise({}, function() {
      return Q.reject("Test Error");
    });
    expect(promise.inspect().state).toBe("rejected");
  });
});