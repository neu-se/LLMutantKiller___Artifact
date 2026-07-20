import { Q } from "./q.js";

describe("Q.master inspect behavior", () => {
  it("should return a promise that inspects to the correct state", async () => {
    const obj = { value: 42 };
    const mastered = Q.master(obj);
    const inspection = mastered.inspect();
    expect(inspection).toEqual({ state: "unknown" });
  });
});