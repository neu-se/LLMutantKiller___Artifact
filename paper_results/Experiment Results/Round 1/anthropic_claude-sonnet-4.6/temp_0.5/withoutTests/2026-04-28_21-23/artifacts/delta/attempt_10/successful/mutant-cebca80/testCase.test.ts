import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should handle an op with no recognized fields gracefully", () => {
    const base = new Delta().insert("hello");
    const change = new Delta();
    // Inject op that has no insert/delete/retain - falls through all conditions
    // Original: all conditions false, returns baseIndex unchanged
    // Mutation: else if(true) enters object-retain branch
    //   slice(0, 0+1) gets "h", getEmbedTypeAndData(undefined, "h") throws
    (change as any).ops = [{}];
    
    expect(() => change.invert(base)).not.toThrow();
    expect(change.invert(base).ops).toEqual([]);
  });
});