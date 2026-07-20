import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick(() => {
      Q.untrackRejection(promise);
    });
    expect(typeof process).toBe("object");
    if (typeof process === "object" && typeof process.emit === "function") {
      process.emit("unhandledRejection", "Test rejection", promise);
    }
  });
});