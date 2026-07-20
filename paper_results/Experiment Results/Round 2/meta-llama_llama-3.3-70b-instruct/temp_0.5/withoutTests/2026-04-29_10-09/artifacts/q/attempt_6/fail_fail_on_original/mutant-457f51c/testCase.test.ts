import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("should not have an exception property for fulfilled promises and should have it for rejected promises", () => {
    const fulfilledPromise = Q.resolve("test");
    const rejectedPromise = Q.reject("error");
    expect(Object.prototype.hasOwnProperty.call(fulfilledPromise, 'exception')).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(rejectedPromise, 'exception')).toBe(true);
  });
});