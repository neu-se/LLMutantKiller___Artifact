// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should correctly delete a property from an object", () => {
    const obj = { a: 1, b: 2 };
    return Q(obj)
      .del("a")
      .then((result) => {
        expect(result).toBeUndefined();
        expect(obj).not.toHaveProperty("a");
        expect(obj).toHaveProperty("b");
      });
  });
});