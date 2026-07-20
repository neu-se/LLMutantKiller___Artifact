const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.join mutation test", () => {
  it("should throw an error with the correct message when values are not the same", async () => {
    const x = "foo";
    const y = "bar";

    await expect(Q.join(x, y)).rejects.toThrow("Q can't join: not the same: foo bar");
  });
});