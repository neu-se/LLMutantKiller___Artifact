import { Q } from "./q.js";

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };
    const qReturnValue = new (function QReturnValue(value) {
      this.value = value;
    })("test");

    // Test with a StopIteration that is NOT a QReturnValue
    expect(Q.isStopIteration(stopIteration)).toBe(true);

    // Test with a QReturnValue that is also a StopIteration
    stopIteration.__proto__ = qReturnValue;
    expect(Q.isStopIteration(stopIteration)).toBe(true);
  });
});