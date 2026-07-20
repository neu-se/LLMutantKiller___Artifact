import { Q } from "./q";

describe("Q.delay", () => {
  it("should resolve with the original value after the specified timeout", (done) => {
    const originalValue = "test";
    const timeout = 10;

    const startTime = Date.now();
    Q.delay(originalValue, timeout).then((value) => {
      const elapsedTime = Date.now() - startTime;
      expect(value).toBe(originalValue);
      expect(elapsedTime).toBeGreaterThanOrEqual(timeout);
      done();
    }).catch((error) => {
      done(error);
    });
  });
});