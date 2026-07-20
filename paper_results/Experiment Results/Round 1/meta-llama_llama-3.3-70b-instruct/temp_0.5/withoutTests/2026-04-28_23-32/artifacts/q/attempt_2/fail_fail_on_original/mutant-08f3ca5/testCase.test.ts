import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should notify progress listener when progress is made", () => {
    let notified = false;
    const promise = Q.defer();
    promise.promise.then(void 0, void 0, (value) => {
      notified = true;
    });
    promise.notify("test");
    expect(notified).toBe(true);
  });
});