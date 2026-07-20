import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call Q.onerror when an error occurs", done => {
    // Arrange
    const error = new Error("Test error");
    let onerrorCalled = false;
    Q.onerror = () => {
      onerrorCalled = true;
      expect(onerrorCalled).toBe(true);
      done();
    };

    // Act
    Q((resolve, reject) => {
      reject(error);
    }).catch(() => {
      // do nothing
    });

    // Wait for the next tick
    setTimeout(() => {
      expect(onerrorCalled).toBe(true);
      done();
    }, 10);
  });
});