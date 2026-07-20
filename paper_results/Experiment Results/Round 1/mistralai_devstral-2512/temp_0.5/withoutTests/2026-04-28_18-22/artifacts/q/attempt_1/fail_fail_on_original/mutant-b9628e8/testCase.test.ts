import { Q } from "./q.js";

describe("Promise.prototype.del", () => {
  it("should correctly dispatch the 'delete' operation", async () => {
    const obj = { prop: "value" };
    const promise = Q(obj);
    const result = await promise.del("prop");
    expect(result).toBe(true);
  });
});