import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loading", () => {
  it("should throw when Q.noConflict is called in a non-browser environment", () => {
    // In Node.js (CommonJS path), Q.noConflict should throw
    // This verifies the module was loaded via the correct CommonJS path
    // and not via the browser/script fallback path
    expect(() => {
      Q.noConflict();
    }).toThrow("Q.noConflict only works when Q is used as a global");
  });
});