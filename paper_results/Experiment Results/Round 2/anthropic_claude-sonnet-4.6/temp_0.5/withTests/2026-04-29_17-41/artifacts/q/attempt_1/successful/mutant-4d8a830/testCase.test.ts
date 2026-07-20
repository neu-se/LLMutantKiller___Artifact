import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("post with null name", () => {
  it("should invoke the function directly when post is called with null as the name", () => {
    return Q(function (a: number, b: number, c: number) {
      return a + b + c;
    })
      .post(null, [1, 2, 3])
      .then(function (sum: number) {
        expect(sum).toEqual(6);
      });
  });
});