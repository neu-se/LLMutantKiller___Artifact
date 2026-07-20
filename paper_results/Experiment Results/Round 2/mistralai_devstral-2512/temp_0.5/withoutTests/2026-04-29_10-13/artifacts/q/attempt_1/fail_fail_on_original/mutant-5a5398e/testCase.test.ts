import { Q } from "./q";

describe("Q.denodeify error message test", () => {
  it("should throw an error with a descriptive message when wrapping an undefined function", () => {
    expect(() => {
      Q.denodeify(undefined as any);
    }).toThrow("Q can't wrap an undefined function");
  });
});