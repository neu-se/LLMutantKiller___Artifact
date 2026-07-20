import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should not throw when thisOp retain is null and otherOp retain is an embed object", () => {
    // thisData = null:
    //   Original: typeof null === 'object' is true, BUT null !== null is false -> skips block, no error
    //   Mutated:  true && otherData !== null -> enters block, Object.keys(null) throws TypeError
    const thisDelta = new Delta([{ retain: null as any }]);
    const otherDelta = new Delta([{ retain: { image: { src: "url" } } }]);

    expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
  });
});