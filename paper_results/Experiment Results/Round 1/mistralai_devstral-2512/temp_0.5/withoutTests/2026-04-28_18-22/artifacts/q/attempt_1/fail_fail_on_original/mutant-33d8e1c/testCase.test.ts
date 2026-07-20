import { Q } from "./q.js";

describe("Promise progress notification", () => {
  it("should notify progress listeners when progress is made", (done) => {
    const deferred = Q.defer();
    let progressValue: any = null;

    deferred.promise.then(null, null, (value) => {
      progressValue = value;
    });

    deferred.notify("test-progress");

    setTimeout(() => {
      expect(progressValue).toBe("test-progress");
      done();
    }, 10);
  });
});