import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with mixed retain types", () => {
  it("should not throw when thisData is an embed object but otherData is a number retain", () => {
    Delta.registerEmbed("image", {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean) => ({ transformed: true }),
    });

    try {
      // thisDelta retains an embed, then inserts text (to prevent chop issues)
      const thisDelta = new Delta().retain({ image: { url: "x" } }).insert("hello");
      // otherDelta retains 1 (number) then inserts text
      const otherDelta = new Delta().retain(1).insert("world");

      // Original: no error, otherData is a number so embed handler not invoked
      // Mutated: throws because it tries Delta.getHandler(undefined)
      expect(() => {
        thisDelta.transform(otherDelta, false);
      }).not.toThrow();
    } finally {
      Delta.unregisterEmbed("image");
    }
  });
});