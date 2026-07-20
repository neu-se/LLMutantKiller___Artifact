import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call the finally callback", () => {
    let callbackCalled = false;
    Q(true).finally(() => {
      callbackCalled = true;
    });
    expect(callbackCalled).toBe(true);
  });
});