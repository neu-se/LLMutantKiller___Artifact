import { Q } from "./q";

describe("Q Promise", () => {
  it("should call Q.onerror when an error occurs", () => {
    // Arrange
    const error = new Error("Test error");
    let onerrorCalled = false;
    Q.onerror = () => {
      onerrorCalled = true;
    };

    // Act
    Q.Promise((resolve, reject) => {
      reject(error);
    }).catch(() => {
      // do nothing
    });

    // Wait for the next tick
    return new Promise(resolve => {
      setTimeout(() => {
        expect(onerrorCalled).toBe(true);
        resolve();
      }, 10);
    });
  });
});