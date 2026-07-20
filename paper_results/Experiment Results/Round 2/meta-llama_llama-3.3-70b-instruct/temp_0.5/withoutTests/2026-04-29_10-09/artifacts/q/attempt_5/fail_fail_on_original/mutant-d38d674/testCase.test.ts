import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
  it("should create a promise with a default fallback when fallback is undefined", () => {
    const promise = Q.Promise({}, undefined);
    expect(typeof promise.inspect).toBe("function");
    expect(promise.inspect().state).toBe("unknown");
  });
});