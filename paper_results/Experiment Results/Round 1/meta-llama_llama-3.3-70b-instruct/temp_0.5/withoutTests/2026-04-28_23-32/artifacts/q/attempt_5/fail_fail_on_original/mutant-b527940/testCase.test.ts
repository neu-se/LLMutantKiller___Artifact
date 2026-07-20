import { Q } from "./q";

describe("Q", () => {
  it("should correctly track unhandled rejections", () => {
    const promise = Q.reject("Test rejection");
    Q.nextTick(() => {
      const unhandledRejections = Q.getUnhandledReasons();
      expect(unhandledRejections).toEqual(["(no stack) Test rejection"]);
    });
  });
});