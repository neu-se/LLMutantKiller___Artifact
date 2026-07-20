import { Q } from "../../../../../q.js";

describe("Q.all", () => {
  it("should handle fulfilled and pending promises correctly", () => {
    const fulfilledPromise = Q.resolve(1);
    const pendingPromise = new Q((resolve, reject) => {
      // This promise will remain pending
    });
    const allPromise = Q.all([fulfilledPromise, pendingPromise]);
    expect(allPromise.inspect().state).toBe("pending");
  });
});