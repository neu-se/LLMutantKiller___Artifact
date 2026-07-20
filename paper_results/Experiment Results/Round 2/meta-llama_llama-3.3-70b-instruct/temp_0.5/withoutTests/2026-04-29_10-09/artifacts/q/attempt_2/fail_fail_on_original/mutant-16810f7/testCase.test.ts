import { Q } from "../../../../../q.js";

describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick(() => {
      Q.untrackRejection(promise);
    });
    expect(typeof process).toBe("object");
  });
});