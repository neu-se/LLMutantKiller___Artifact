import { Q } from "./q.js";

describe("Q.delay", () => {
  it("should delay the resolution of a promise by the specified timeout", (done) => {
    const start = Date.now();
    Q.delay(50).then(() => {
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(50);
      done();
    }).catch((err) => {
      done(err);
    });
  });
});