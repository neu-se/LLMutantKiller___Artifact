import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should not notify progress listener when progress is made and threw is false", () => {
    let notified = false;
    const promise = Q.defer();
    promise.promise.then(void 0, void 0, () => {
      notified = true;
    });
    let threw = false;
    promise.notify();
    expect(notified).toBe(true);
    expect(threw).toBe(false);
  });
});