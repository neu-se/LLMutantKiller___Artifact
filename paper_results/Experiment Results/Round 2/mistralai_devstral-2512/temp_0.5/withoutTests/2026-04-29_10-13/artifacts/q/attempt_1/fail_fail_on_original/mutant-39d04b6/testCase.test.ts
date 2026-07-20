import { Q } from "./q.js";

describe("Promise inspection", () => {
  it("should return a state object with 'unknown' state for a promise without an inspect function", () => {
    const promise = Q.makePromise({});
    const inspection = promise.inspect();
    expect(inspection).toEqual({ state: "unknown" });
  });
});