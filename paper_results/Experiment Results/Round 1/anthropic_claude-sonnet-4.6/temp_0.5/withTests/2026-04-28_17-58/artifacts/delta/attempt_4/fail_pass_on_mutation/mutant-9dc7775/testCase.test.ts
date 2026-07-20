import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('does not throw when thisData is null and otherData is an embed retain', () => {
    Delta.registerEmbed('myEmbed', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
      invert: (a: any, b: any) => b,
    });

    let accessCount = 0;
    const specialOps = new Proxy([{ retain: {} }] as any[], {
      get(target, prop, receiver) {
        if (prop === '0') {
          accessCount++;
          return accessCount <= 3 ? { retain: {} } : { retain: null };
        }
        return Reflect.get(target, prop, receiver);
      }
    });

    const a = new Delta();
    (a as any).ops = specialOps;
    const b = new Delta([{ retain: { myEmbed: 'value' } }]);

    expect(() => a.transform(b, false)).not.toThrow();

    Delta.unregisterEmbed('myEmbed');
  });
});