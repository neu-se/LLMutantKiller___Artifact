import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify source contains correct error message", () => {
  it("should contain the error message \"Q can't wrap an undefined function\" in the denodeify source", () => {
    // The mutation changes the error message inside dead code (if (false) branch).
    // Since the branch never executes, we must inspect the function source to detect the mutation.
    const denodeifySource = Q.denodeify.toString();
    expect(denodeifySource).toContain("Q can't wrap an undefined function");
  });
});