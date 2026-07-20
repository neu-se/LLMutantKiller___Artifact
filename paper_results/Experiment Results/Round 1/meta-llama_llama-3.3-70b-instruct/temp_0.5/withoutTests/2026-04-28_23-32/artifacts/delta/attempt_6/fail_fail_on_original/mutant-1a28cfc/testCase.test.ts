import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should throw an error when compose is called with invalid b", () => {
    const a = new Delta([{ retain: { test: "test" } }]);
    const b = new Delta([{ retain: null }]);
    expect(() => {
      a.compose(b);
    }).toThrowError();
  });
});