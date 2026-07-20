import { Q } from "./q";

describe("Q.progress", () => {
  it("should call the progress callback when notified", (done) => {
    const deferred = Q.defer();
    let progressCalled = false;

    Q.progress(deferred.promise, (progressValue) => {
      progressCalled = true;
      expect(progressValue).toBe("test");
      done();
    });

    deferred.notify("test");
  });
});