import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done", () => {
  it("should call the fulfilled callback when promise resolves and fulfilled is provided", (done) => {
    let called = false;

    Q("resolved value").done(
      function (value: unknown) {
        called = true;
        expect(value).toBe("resolved value");
        expect(called).toBe(true);
        done();
      }
    );

    // Timeout to fail the test if callback is never called
    setTimeout(() => {
      if (!called) {
        done(new Error("fulfilled callback was never called"));
      }
    }, 500);
  });
});