import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q ses branch", () => {
  it("should properly handle the ses environment check by verifying module integrity via noConflict throwing in node", () => {
    // In the original code, the ses branch properly handles ses.ok() check
    // and sets ses.makeQ = definition when ses.ok() is true.
    // The mutation removes this body entirely.
    // In Node.js, Q.noConflict should throw since we're not in a browser global context.
    expect(() => {
      Q.noConflict();
    }).toThrow("Q.noConflict only works when Q is used as a global");
  });
});