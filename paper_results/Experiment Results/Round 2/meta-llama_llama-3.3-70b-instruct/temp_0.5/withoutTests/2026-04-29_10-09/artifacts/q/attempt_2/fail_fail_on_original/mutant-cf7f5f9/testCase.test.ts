describe("Q Promise", () => {
  it("should call Q.onerror when an error occurs", () => {
    // Arrange
    const error = new Error("Test error");
    let onerrorCalled = false;
    Q.onerror = () => {
      onerrorCalled = true;
    };

    // Act
    try {
      throw error;
    } catch (e) {
      Q.nextTick(() => {
        throw e;
      });
    }

    // Assert
    // We can't directly assert onerrorCalled here because Q.nextTick is asynchronous.
    // Instead, we can use a timeout to wait for the next tick.
    return new Promise(resolve => {
      setTimeout(() => {
        expect(onerrorCalled).toBe(true);
        resolve();
      }, 10);
    });
  });
});