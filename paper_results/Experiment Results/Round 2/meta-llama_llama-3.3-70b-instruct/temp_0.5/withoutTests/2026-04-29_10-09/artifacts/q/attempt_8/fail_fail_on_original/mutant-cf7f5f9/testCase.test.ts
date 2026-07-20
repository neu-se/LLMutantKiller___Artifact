import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call Q.onerror when an error occurs", done => {
    // Arrange
    const error = new Error("Test error");
    let onerrorCalled = false;
    Q.onerror = (err: any) => {
      onerrorCalled = true;
      expect(onerrorCalled).toBe(true);
      done();
    };

    // Act
    Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
      reject(error);
    }).catch((err: any) => {
      // do nothing
    });
  });
});