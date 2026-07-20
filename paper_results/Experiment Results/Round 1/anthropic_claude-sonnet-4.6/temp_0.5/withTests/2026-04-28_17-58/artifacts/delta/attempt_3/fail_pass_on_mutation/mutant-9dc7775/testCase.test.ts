import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('does not throw when thisData is null and otherData is an embed retain', () => {
    Delta.registerEmbed('myEmbed', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
      invert: (a: any, b: any) => b,
    });

    let callCount = 0;
    const specialOp = {
      get retain() {
        callCount++;
        return callCount <= 5 ? {} : null;
      }
    };

    const a = new Delta();
    (a as any).ops = [specialOp];
    const b = new Delta([{ retain: { myEmbed: 'value' } }]);

    expect(() => a.transform(b, false)).not.toThrow();

    Delta.unregisterEmbed('myEmbed');
  });
});