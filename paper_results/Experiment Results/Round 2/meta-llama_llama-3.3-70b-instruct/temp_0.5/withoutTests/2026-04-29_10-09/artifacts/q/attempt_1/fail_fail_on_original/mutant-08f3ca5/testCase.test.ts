import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

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

    // We need to wait for the promise to settle before making assertions
    // Since Q uses a custom implementation of nextTick, we can't use Jest's built-in waitFor
    // Instead, we'll use a simple timeout to wait for the promise to settle
    setTimeout(() => {
      expect(progressCalled).toBe(true);
      expect(fulfilledValue).toBe("fulfilled");
    }, 0);
  });
});