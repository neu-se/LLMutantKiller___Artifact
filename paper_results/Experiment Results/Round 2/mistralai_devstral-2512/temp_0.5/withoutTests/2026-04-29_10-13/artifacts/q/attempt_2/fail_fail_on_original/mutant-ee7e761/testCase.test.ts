import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.delete", () => {
  it("should delete a property from a fulfilled promise", () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj);
    return promise["delete"]("a").then(() => {
      expect(obj).toEqual({ b: 2 });
    });
  });
});