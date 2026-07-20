import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call Q.onerror when an error occurs", () => {
    // Arrange
    const error = new Error("Test error");
    let onerrorCalled = false;
    Q.onerror = (err: any) => {
      onerrorCalled = true;
    };

    // Act
    Q.Promise((resolve: (value: any) => void, reject: (reason: any) => void) => {
      reject(error);
    }).catch((err: any) => {
      // do nothing
    });

    // Wait for the next tick
    return new Promise((resolve: (value: any) => void) => {
      setTimeout(() => {
        expect(onerrorCalled).toBe(true);
        resolve();
      }, 10);
    });
  });
});