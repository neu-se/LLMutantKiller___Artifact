import pull from "./pull.js";

describe("pull function with 4 arguments", () => {
  it("should correctly handle 4 arguments in partial application", () => {
    const mockRead = jest.fn((...args) => args);
    const partialSink = pull(mockRead, (a) => a + 1, (b) => b * 2, (c) => c + 3, (d) => d * 4);

    const result = partialSink("input");
    expect(result).toEqual(["input", "input1", "input12", "input123", "input1234"]);
  });
});