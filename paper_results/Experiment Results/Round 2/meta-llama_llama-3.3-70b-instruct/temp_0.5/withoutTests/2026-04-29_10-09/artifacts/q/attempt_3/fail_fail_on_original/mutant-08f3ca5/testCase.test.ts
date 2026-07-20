import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should handle progress notifications correctly", () => {
    let progressCalled = false;
    let fulfilledValue: any;

    Q((resolve, reject, notify) => {
      notify("progress");
      resolve("fulfilled");
    })
    .then((value) => {
      fulfilledValue = value;
    })
    .progress((progress) => {
      progressCalled = true;
    });

    expect(progressCalled).toBe(true);
    expect(fulfilledValue).toBeUndefined();
  });
});