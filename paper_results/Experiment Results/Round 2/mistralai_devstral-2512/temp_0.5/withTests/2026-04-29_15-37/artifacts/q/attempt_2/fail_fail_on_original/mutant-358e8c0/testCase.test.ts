import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspection mutation test", () => {
  it("should correctly identify fulfilled promises", async () => {
    const fulfilledPromise = Q(42);
    const snapshot = fulfilledPromise.inspect();
    expect(snapshot.state).toBe("fulfilled");
    expect(snapshot.value).toBe(42);
  });
});