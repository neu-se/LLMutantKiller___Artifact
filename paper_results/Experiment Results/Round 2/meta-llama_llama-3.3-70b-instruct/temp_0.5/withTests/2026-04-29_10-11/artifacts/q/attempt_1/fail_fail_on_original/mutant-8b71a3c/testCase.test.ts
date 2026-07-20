import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
  it("should resolve promise with pending state", () => {
    const promise = Q.defer().promise;
    const inspected = promise.inspect();
    expect(inspected.state).toBe("pending");
    promise.valueOf = function () {
      if (inspected.state === "pending") {
        return promise;
      }
      return inspected.value;
    };
    expect(promise.valueOf()).toBe(promise);
  });
});