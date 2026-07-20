import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should reject when timeout is undefined", (done) => {
    const originalValue = "test";

    Q.delay(originalValue, undefined).then(() => {
      done(new Error("Expected promise to be rejected"));
    }).catch((error) => {
      expect(error).toBeDefined();
      done();
    });
  });
});