import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should handle progress notifications correctly", () => {
    let progressCalled = false;

    Q((resolve: (value: any) => void, reject: (reason: any) => void, notify: (progress: any) => void) => {
      notify("progress");
      resolve("fulfilled");
    })
    .progress((progress: any) => {
      progressCalled = true;
    })
    .then((value: any) => {
      expect(progressCalled).toBe(true);
      expect(value).toBe("fulfilled");
    });
  });
});