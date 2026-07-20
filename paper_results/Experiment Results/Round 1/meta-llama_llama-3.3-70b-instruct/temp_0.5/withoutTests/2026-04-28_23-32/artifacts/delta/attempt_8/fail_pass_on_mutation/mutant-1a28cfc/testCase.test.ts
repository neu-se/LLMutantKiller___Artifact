import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should throw an error when compose is called with non-object b", () => {
    const a = new Delta([{ retain: { test: "test" } }]);
    const b = new Delta([{ retain: { test: "test2" } }]);
    Delta.registerEmbed('test', {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => a,
    });
    expect(() => {
      a.compose(b);
    }).not.toThrowError();
  });
});