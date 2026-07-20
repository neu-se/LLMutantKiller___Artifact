const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should handle empty array in reduce without throwing", () => {
    const result = Q.all([]);
    return result.then((value: any) => {
      expect(value).toEqual([]);
    });
  });
});