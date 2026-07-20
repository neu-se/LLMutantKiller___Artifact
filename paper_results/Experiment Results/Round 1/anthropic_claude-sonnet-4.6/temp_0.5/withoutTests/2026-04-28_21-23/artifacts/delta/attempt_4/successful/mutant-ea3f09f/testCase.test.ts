import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should not throw when thisData is empty object and otherData is a number", () => {
    const thisDelta = new Delta([{ retain: {} as any }]);
    const otherDelta = new Delta([{ retain: 1 }]);

    // Original: typeof 1 === 'object' is false → block not entered → no error
    // Mutated: block entered → embedType = undefined → getHandler(undefined) throws
    expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
  });
});