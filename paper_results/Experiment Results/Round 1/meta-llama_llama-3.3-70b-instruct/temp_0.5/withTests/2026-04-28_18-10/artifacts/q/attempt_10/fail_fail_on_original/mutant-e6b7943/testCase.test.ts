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

    expect(Q.isStopIteration({})).toBe(false);
    expect(Q.isStopIteration(new Error("StopIteration"))).toBe(true);
    expect(Q.isStopIteration({ name: "StopIteration" })).toBe(false);
  });
});