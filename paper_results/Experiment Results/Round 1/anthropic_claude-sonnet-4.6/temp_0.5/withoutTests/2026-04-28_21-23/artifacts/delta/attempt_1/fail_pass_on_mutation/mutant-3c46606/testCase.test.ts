import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with registered embed handler', () => {
  it('should use the registered embed handler when transforming object retains of the same type', () => {
    const transformMock = jest.fn((a: unknown, b: unknown, priority: boolean) => ({ merged: true }));
    
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: transformMock,
    });

    const delta1 = new Delta().retain({ image: { width: 100 } });
    const delta2 = new Delta().retain({ image: { height: 200 } });

    const result = delta1.transform(delta2, true);

    expect(transformMock).toHaveBeenCalledWith({ width: 100 }, { height: 200 }, true);
    expect(result.ops[0].retain).toEqual({ image: { merged: true } });

    Delta.unregisterEmbed('image');
  });
});