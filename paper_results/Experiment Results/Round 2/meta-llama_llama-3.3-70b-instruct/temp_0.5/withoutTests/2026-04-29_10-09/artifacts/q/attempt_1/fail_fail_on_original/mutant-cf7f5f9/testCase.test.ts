import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should call Q.onerror when an error occurs", () => {
    // Arrange
    const error = new Error("Test error");
    const onerrorSpy = jest.fn();
    Q.onerror = onerrorSpy;

    // Act
    Q.done(Promise.reject(error));

    // Assert
    expect(onerrorSpy).toHaveBeenCalledTimes(1);
    expect(onerrorSpy).toHaveBeenCalledWith(error);
  });
});