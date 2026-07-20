import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done", () => {
  it("should call the fulfilled callback when done is called with a fulfilled handler on a resolved promise", (done) => {
    const fulfillmentValue = 42;
    let callbackCalled = false;
    let receivedValue: number | undefined;

    Q(fulfillmentValue).done(
      function (value: number) {
        callbackCalled = true;
        receivedValue = value;
      }
    );

    // Use a small delay to allow async resolution
    setTimeout(function () {
      expect(callbackCalled).toBe(true);
      expect(receivedValue).toBe(fulfillmentValue);
      done();
    }, 100);
  });
});