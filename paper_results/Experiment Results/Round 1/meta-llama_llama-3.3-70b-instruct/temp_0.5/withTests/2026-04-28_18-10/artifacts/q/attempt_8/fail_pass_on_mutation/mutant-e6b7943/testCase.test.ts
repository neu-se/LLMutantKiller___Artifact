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

    const error = {};
    expect(Q.isStopIteration(error)).toBe(false);
  });
});