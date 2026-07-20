const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.any progress notification", () => {
  it("should notify progress with index and value", (done) => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const progressSpy = jest.fn();

    Q.any([deferred1.promise, deferred2.promise]).then(
      () => {},
      () => {},
      progressSpy
    );

    // Simulate progress on the first promise
    deferred1.notify("progress1");

    // Check that progress was called with the correct arguments
    setTimeout(() => {
      expect(progressSpy).toHaveBeenCalledWith({
        index: 0,
        value: "progress1"
      });
      done();
    }, 10);
  });
});