import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module initial state", () => {
  it("longStackSupport should be true as set by the module initialization code", () => {
    // The original code unconditionally sets Q.longStackSupport = true after module init
    // The mutated code sets Q.longStackSupport = false instead
    // We need to check the value before any test modifies it
    // Since modules are cached, we use a fresh require
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    expect(freshQ.longStackSupport).toBe(true);
  });
});