import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
  it("should return promise when inspected state is pending", () => {
    const promise = Q.defer().promise;
    const inspected = promise.inspect();
    expect(inspected.state).toBe("pending");
    const originalValueOf = promise.valueOf;
    promise.valueOf = function () {
      if (inspected.state === "pending") {
        return promise;
      }
      return inspected.value;
    };
    expect(promise.valueOf()).toBe(promise);
    promise.valueOf = originalValueOf;
  });
});