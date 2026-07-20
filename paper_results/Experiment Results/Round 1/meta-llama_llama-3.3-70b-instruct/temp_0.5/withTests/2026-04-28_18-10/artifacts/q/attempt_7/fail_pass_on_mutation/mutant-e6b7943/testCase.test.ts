describe("Q", () => {
  it("should handle StopIteration exception correctly", () => {
    const Q = {
      isStopIteration: function(exception) {
        return exception instanceof Error && exception.name === "StopIteration" || exception instanceof this.QReturnValue;
      },
      QReturnValue: function(value) {
        this.value = value;
      }
    };

    const error = new Error();
    error.name = "StopIteration";
    expect(Q.isStopIteration(error)).toBe(true);
    const anotherError = {};
    expect(Q.isStopIteration(anotherError)).toBe(false);
  });
});