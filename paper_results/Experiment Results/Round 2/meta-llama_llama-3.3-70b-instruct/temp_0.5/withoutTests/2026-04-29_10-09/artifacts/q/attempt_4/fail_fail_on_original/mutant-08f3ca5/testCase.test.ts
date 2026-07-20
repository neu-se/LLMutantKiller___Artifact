import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should handle progress notifications correctly", (done) => {
    let progressCalled = false;
    let fulfilledValue: any;

    Q.promise((resolve: (value: any) => void, reject: (reason: any) => void, notify: (progress: any) => void) => {
      notify("progress");
      resolve("fulfilled");
    })
    .then((value: any) => {
      fulfilledValue = value;
    })
    .progress((progress: any) => {
      progressCalled = true;
    })
    .then(() => {
      expect(progressCalled).toBe(true);
      expect(fulfilledValue).toBe("fulfilled");
      done();
    });
  });
});