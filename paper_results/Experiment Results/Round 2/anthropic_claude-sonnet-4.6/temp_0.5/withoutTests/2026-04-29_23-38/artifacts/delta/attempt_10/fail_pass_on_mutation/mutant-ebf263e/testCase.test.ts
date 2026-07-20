import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("detects optimization difference with insert followed by retain and other has retain then retain-object", () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({ ...a as object, ...b as object }),
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });
    
    const a = new Delta().insert("A").retain({ image: { src: 'foo' } });
    const b = new Delta().retain(1).retain({ image: { alt: 'bar' } });
    const result = a.compose(b);
    
    Delta.unregisterEmbed('image');
    
    expect(result).toEqual(
      new Delta().insert("A").retain({ image: { src: 'foo', alt: 'bar' } })
    );
  });
});