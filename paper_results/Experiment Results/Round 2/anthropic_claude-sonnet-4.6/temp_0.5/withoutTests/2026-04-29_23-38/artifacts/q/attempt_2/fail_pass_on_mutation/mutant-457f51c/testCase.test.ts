import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise constructor dead code block", () => {
  it("should not throw when creating a promise via Promise constructor path", () => {
    // If the if(false) block somehow executes with if(true), 
    // 'inspected' would be undefined causing a ReferenceError
    expect(() => {
      const p = Q.fulfill(42);
    }).not.toThrow();
  });
});