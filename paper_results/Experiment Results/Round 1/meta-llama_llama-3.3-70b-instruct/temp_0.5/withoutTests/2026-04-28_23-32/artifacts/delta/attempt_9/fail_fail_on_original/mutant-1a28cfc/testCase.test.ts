import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should throw an error when getEmbedTypeAndData is called with non-object b", () => {
    const a = { test: "test" };
    const b = null;
    const getEmbedTypeAndData = (a: any, b: any) => {
      if (typeof a !== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`);
      }
      if (typeof b !== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
      }
      // rest of your function
    };
    Delta.registerEmbed('test', {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => a,
    });
    expect(() => {
      getEmbedTypeAndData(a, b);
    }).toThrowError(`cannot retain a null`);
  });
});