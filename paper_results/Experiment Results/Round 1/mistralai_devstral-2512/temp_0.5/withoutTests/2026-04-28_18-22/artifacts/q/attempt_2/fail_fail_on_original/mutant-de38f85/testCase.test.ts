import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys mutation test", () => {
  it("should correctly dispatch the 'keys' operation", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);

    return promise.keys().then((keys: string[]) => {
      expect(keys).toEqual(["a", "b", "c"]);
    });
  });
});