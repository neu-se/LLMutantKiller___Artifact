import { Q } from "./q.js";

describe("Q.join mutation test", () => {
  it("should throw an error with the correct message when values are not the same", () => {
    const x = "foo";
    const y = "bar";

    expect(() => {
      Q.join(x, y);
    }).toThrow("Q can't join: not the same: foo bar");
  });
});