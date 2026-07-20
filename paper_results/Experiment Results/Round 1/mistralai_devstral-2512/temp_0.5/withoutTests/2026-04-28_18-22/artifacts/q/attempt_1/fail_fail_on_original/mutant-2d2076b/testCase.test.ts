import { Q } from "./q.js";

describe("Q.delay behavior with undefined timeout", () => {
  it("should resolve immediately when timeout is undefined", (done) => {
    const startTime = Date.now();
    Q.delay("test", undefined).then((value) => {
      const elapsedTime = Date.now() - startTime;
      expect(value).toBe("test");
      expect(elapsedTime).toBeLessThan(10); // Should resolve immediately
      done();
    }).catch((error) => {
      done(error);
    });
  });
});