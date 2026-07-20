import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe("invert() with numeric retain and attributes", () => {
  it("should correctly invert a numeric retain with attributes without throwing", () => {
    Delta.registerEmbed<Op[]>("delta", {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority as boolean).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    const delta = new Delta().retain(2, { bold: true });
    const base = new Delta().insert("ab");

    const expected = new Delta().retain(2, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);

    Delta.unregisterEmbed("delta");
  });
});