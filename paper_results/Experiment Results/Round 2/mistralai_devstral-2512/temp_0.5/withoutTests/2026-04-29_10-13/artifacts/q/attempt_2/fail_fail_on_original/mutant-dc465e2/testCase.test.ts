import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout behavior", () => {
  it("should resolve with the original promise value when it resolves before timeout", (done) => {
    const originalPromise = Q.resolve("success");
    const timeoutPromise = originalPromise.timeout(100);

    timeoutPromise.then(
      (value: string) => {
        expect(value).toBe("success");
        done();
      },
      (error: Error) => {
        done.fail("Promise should have resolved, not rejected");
      }
    );
  });
});