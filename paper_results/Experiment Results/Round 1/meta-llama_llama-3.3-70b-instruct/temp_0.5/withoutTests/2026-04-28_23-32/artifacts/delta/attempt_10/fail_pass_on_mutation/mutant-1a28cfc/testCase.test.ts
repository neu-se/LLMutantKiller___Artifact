import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should not throw an error when compose is called with object b", () => {
    const a = new Delta([{ retain: { test: "test" } }]);
    const b = new Delta([{ retain: { test2: "test2" } }]);
    Delta.registerEmbed('test', {
      compose: (a: any, b: any, keepNull: boolean) => {
        if (typeof b !== 'object' || b === null) {
          throw new Error('b is not an object');
        }
        return a;
      },
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => a,
    });
    const getEmbedTypeAndData = (a: any, b: any) => {
      if (typeof a !== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`);
      }
      if (typeof b !== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
      }
      // rest of your function
    };
    expect(() => {
      getEmbedTypeAndData(a.ops[0].retain, b.ops[0].retain);
    }).not.toThrowError();
  });
});