import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should delay the resolution of a promise by the specified timeout", (done) => {
    const start = Date.now();
    Q.delay(50).then(() => {
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(50);
      done();
    }).catch((err: unknown) => {
      done(err as Error);
    });
  });
});