import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise", () => {
  it("should successfully create a promise when given a valid resolver function", () => {
    return Q.promise(function (resolve: (value: number) => void) {
      resolve(42);
    }).then(function (value: number) {
      expect(value).toBe(42);
    });
  });
});