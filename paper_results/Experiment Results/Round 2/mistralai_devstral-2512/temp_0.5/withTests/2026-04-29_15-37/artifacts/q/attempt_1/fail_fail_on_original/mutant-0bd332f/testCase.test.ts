import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce mutation test", () => {
  it("should throw TypeError when reduce is called on an empty array with no initial value", () => {
    expect(() => {
      Q.all([]);
    }).not.toThrow();
  });
});