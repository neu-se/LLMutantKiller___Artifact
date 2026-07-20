import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform embed", () => {
  it("transforms embed ops using registered handler", () => {
    const embedType = "image";
    Delta.registerEmbed(embedType, {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => ({ transformed: true }),
    });
    const d1 = new Delta().retain({ [embedType]: { src: "a" } });
    const d2 = new Delta().retain({ [embedType]: { src: "b" } });
    const result = d1.transform(d2, false);
    Delta.unregisterEmbed(embedType);
    expect(result.ops[0].retain).toEqual({ [embedType]: { transformed: true } });
  });
});