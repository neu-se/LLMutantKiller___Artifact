import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embeds and null attributes', () => {
  beforeEach(() => {
    // Register a custom embed handler that's sensitive to keepNull
    Delta.registerEmbed<{ text: string, attr?: string | null }>('test', {
      compose: (a, b, keepNull) => {
        const result = {
          text: a.text + b.text,
          attr: b.attr !== undefined ? b.attr : (keepNull ? null : a.attr)
        };
        return result;
      },
      transform: (a, b, priority) => ({
        text: a.text,
        attr: priority ? b.attr : a.attr
      }),
      invert: (a, b) => ({
        text: b.text,
        attr: b.attr
      }),
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('test');
  });

  it('preserves null attributes when composing with retain', () => {
    // Create a delta with an embed that has an attribute
    const a = new Delta().insert(
      { test: { text: 'a', attr: 'value' } },
      { bold: true }
    );

    // Create another delta that retains the embed with null attribute
    const b = new Delta().retain(
      { test: { text: 'b', attr: null } }
    );

    // With original code (keepNull=true), the null attribute should be preserved
    // With mutated code (keepNull=false), the original attribute should be kept
    const result = a.compose(b);

    // Check the ops to see how attributes were composed
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].insert).toEqual({ test: { text: 'ba', attr: null } });
  });
});