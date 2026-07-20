import { Q } from "./q.js";

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    expect(Q.getUnhandledReasons().length).toBe(0);
    Q.nextTick(() => {
      expect(Q.getUnhandledReasons().length).toBe(1);
    });
  });
});