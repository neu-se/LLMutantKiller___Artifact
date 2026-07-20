import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.catch", () => {
  it("should be accessible as Promise.prototype['catch'] on the Q module", () => {
    // The mutation changes Q["catch"] to Q[""], which means the static method
    // Q.catch should not exist in the mutated version
    expect(typeof Q["catch"]).toBe("function");
  });
});