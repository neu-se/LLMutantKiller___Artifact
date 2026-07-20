describe("Q Promise", () => {
  it("should create a promise with a default fallback when fallback is undefined", () => {
    const Q = require('../../../../../../../../subject_repositories/q/q');
    const promise = Q.Promise({}, undefined);
    expect(promise.inspect().state).toBe("unknown");
  });
});