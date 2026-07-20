import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.del", () => {
  it("should correctly dispatch the 'delete' operation", async () => {
    const obj = { a: 10 };
    const promise = Q(obj).del("a");
    await promise;
    expect(obj.hasOwnProperty("a")).toBe(false);
  });
});