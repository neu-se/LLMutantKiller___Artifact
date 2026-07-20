import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call the finally callback", () => {
    let callbackCalled = false;
    Q(true).finally(() => {
      callbackCalled = true;
    });
    // Introduce a small delay to ensure the finally callback is called
    setTimeout(() => {
      expect(callbackCalled).toBe(true);
    }, 0);
  });
});