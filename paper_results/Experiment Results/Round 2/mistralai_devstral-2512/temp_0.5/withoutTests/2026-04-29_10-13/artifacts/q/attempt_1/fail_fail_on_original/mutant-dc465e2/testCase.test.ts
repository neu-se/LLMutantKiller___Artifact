import { Q } from "./q.js";

describe("Q.timeout behavior", () => {
  it("should resolve with the original promise value when it resolves before timeout", (done) => {
    const originalPromise = Q.resolve("success");
    const timeoutPromise = originalPromise.timeout(100);

    timeoutPromise.then(
      (value) => {
        expect(value).toBe("success");
        done();
      },
      (error) => {
        done.fail("Promise should have resolved, not rejected");
      }
    );
  });
});