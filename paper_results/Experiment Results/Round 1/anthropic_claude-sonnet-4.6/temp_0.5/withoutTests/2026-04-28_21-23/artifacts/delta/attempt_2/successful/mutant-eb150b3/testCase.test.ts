import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose embed keepNull parameter', () => {
  it('should pass keepNull=true when action is retain during embed compose', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed('custom', {
      compose(_a: unknown, _b: unknown, keepNull: boolean): unknown {
        capturedKeepNull = keepNull;
        return keepNull ? { result: 'keepNull' } : { result: 'noKeepNull' };
      },
      invert(_a: unknown, _b: unknown): unknown { return _b; },
      transform(_a: unknown, _b: unknown, _priority: boolean): unknown { return _b; },
    });

    // base has a retain embed, other also retains it - action will be 'retain'
    const base = new Delta().retain({ custom: { x: 1 } });
    const other = new Delta().retain({ custom: { x: 2 } });
    const result = base.compose(other);

    // In original: action === 'retain' so keepNull = true
    // In mutated: action !== 'retain' so keepNull = false
    expect(capturedKeepNull).toBe(true);
    expect(result.ops[0]).toEqual({ retain: { custom: { result: 'keepNull' } } });

    Delta.unregisterEmbed('custom');
  });
});