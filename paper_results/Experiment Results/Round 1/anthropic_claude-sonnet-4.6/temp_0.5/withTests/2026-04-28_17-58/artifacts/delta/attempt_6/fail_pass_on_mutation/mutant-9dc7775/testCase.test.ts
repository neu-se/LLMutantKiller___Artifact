import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('does not call Object.keys with null when thisData is null', () => {
    Delta.registerEmbed('myEmbed', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
      invert: (a: any, b: any) => b,
    });

    const originalKeys = Object.keys;
    const keysSpy = jest.spyOn(Object, 'keys').mockImplementation((obj: any) => {
      if (obj === null) return [];
      return originalKeys(obj);
    });

    let firstAccess = true;
    const specialOp = {
      get retain() {
        if (firstAccess) {
          firstAccess = false;
          return {};
        }
        return null;
      }
    };

    const a = new Delta();
    (a as any).ops = [specialOp];
    const b = new Delta([{ retain: { myEmbed: 'value' } }]);

    a.transform(b, false);

    // Original: thisData !== null → false → skip block → Object.keys not called with null
    // Mutated (no null check): enter block → Object.keys(null) called
    expect(keysSpy).not.toHaveBeenCalledWith(null);

    keysSpy.mockRestore();
    Delta.unregisterEmbed('myEmbed');
  });
});