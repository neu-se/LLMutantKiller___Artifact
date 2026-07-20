import { Q } from "./q";

describe("Q promise progress notifications", () => {
  it("should notify progress listeners when progress is reported", (done) => {
    const deferred = Q.defer();
    let progressReceived = false;

    deferred.promise.then(
      () => {},
      () => {},
      (progress) => {
        progressReceived = true;
        expect(progress).toBe("test progress");
      }
    );

    deferred.notify("test progress");

    setTimeout(() => {
      expect(progressReceived).toBe(true);
      done();
    }, 10);
  });
});