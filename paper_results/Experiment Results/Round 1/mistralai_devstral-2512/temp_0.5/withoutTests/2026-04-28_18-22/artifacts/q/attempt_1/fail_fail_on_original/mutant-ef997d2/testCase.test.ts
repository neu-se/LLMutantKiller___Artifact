import { Q } from "./q.js";

describe("Q.master", () => {
  it("should return a promise that responds to inspect", () => {
    const obj = { value: 42 };
    const mastered = Q.master(obj);
    expect(typeof mastered.inspect).toBe("function");
    const inspection = mastered.inspect();
    expect(inspection).toHaveProperty("state");
  });
});