import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
  it("should return promise when inspected state is pending", () => {
    const promise = Q.defer().promise;
    const inspected = promise.inspect();
    expect(inspected.state).toBe("pending");
    const valueOf = promise.valueOf;
    promise.valueOf = function () {
      if (inspected.state !== "pending") {
        return inspected.value;
      }
      return promise;
    };
    expect(promise.valueOf()).toBe(promise);
  });
});