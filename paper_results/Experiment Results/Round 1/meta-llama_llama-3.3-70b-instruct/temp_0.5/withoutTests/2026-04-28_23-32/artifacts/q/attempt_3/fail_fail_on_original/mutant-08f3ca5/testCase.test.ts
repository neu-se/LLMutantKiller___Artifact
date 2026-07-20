import { Q } from "./q.js";

describe("Q Promise", () => {
  it("should notify progress listener when progress is made", () => {
    let notified = false;
    const promise = Q.defer();
    promise.promise.then(void 0, void 0, () => {
      notified = true;
    });
    promise.notify();
    expect(notified).toBe(true);
  });
});