const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with callbacks", () => {
  it("should properly handle promise with fulfillment callback", (done) => {
    const promise = Q.resolve(42);
    let fulfillmentValue: number | null = null;

    promise.done((value: number) => {
      fulfillmentValue = value;
    });

    setTimeout(() => {
      expect(fulfillmentValue).toBe(42);
      done();
    }, 10);
  });
});