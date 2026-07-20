import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should call the fulfilled callback when a fulfilled promise is done with a fulfilled handler", (done) => {
    const resolvedValue = 42;
    let callbackValue: number | undefined;

    Q(resolvedValue).done(
      function (value: number) {
        callbackValue = value;
        expect(callbackValue).toBe(resolvedValue);
        done();
      },
      function () {
        done(new Error("rejected callback should not be called"));
      }
    );
  });
});