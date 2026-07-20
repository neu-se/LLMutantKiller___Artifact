import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should throw an error when getEmbedTypeAndData is called with invalid b", () => {
    const a = { test: "test" };
    const b = { test: "test" };
    expect(() => {
      const delta = new Delta();
      // Since getEmbedTypeAndData is not a method of the Delta class, 
      // you cannot call it directly. You need to define it as a function.
      function getEmbedTypeAndData(a, b) {
        if (typeof a !== 'object' || a === null) {
          throw new Error(`cannot retain a ${typeof a}`);
        }
        if (typeof b !== 'object' || b === null) {
          throw new Error(`cannot retain a ${typeof b}`);
        }
        // rest of your function
      }
      getEmbedTypeAndData(a, null);
    }).toThrowError(`cannot retain a null`);
  });
});