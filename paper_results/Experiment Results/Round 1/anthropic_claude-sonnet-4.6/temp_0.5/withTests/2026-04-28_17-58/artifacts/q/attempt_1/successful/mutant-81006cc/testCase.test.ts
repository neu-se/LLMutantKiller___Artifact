import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.mapply", () => {
  it("should invoke the named method on the object with the provided arguments", () => {
    const subject = {
      add: function (a: number, b: number) {
        return a + b;
      }
    };

    return Q.mapply(subject, "add", [3, 4]).then((result: number) => {
      expect(result).toBe(7);
    });
  });
});