import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should not throw an error when compose is called with valid b", () => {
    const a = new Delta([{ retain: { test: "test" } }]);
    const b = new Delta([{ retain: { test: "test2" } }]);
    expect(() => {
      a.compose(b);
    }).not.toThrowError();
  });
});