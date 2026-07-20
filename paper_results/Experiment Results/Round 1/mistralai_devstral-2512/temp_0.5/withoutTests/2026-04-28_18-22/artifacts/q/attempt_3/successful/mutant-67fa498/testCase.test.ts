const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick.runAfter", () => {
  it("should execute tasks added via runAfter", (done) => {
    let executed = false;
    Q.nextTick.runAfter(() => {
      executed = true;
      done();
    });
    expect(executed).toBe(false);
  });
});