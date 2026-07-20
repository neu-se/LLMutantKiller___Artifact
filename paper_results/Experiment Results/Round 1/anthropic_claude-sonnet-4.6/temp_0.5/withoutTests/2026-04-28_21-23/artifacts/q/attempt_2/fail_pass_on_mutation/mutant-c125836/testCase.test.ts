import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter behavior", () => {
  it("should not trigger flush when runAfter is called", (done) => {
    let taskRan = false;
    Q.nextTick.runAfter(() => { taskRan = true; });
    // Schedule something to verify runAfter task runs after nextTick tasks
    Q.nextTick(() => {
      setTimeout(() => {
        expect(taskRan).toBe(true);
        done();
      }, 50);
    });
  });
});