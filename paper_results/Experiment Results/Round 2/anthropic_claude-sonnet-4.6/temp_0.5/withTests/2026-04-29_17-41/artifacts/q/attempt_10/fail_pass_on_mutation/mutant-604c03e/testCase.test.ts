describe("module loading", () => {
  it("loads the Q module without syntax errors", () => {
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();
  });
});