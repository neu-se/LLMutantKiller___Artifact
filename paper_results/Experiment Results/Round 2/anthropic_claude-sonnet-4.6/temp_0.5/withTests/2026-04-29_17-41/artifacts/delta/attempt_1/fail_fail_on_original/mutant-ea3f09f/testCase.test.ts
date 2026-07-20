import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform()', () => {
  it('transform embed retain with number retain should not invoke embed handler', () => {
    const transformFn = jest.fn((a: Op[], b: Op[], priority: boolean) =>
      new Delta(a).transform(new Delta(b), priority).ops
    );

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: transformFn,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // thisData is an embed object, otherData is a number
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    
    const result = a.transform(b, true);
    
    // The embed handler should NOT be called when otherData is a number
    expect(transformFn).not.toHaveBeenCalled();
    
    // The result should preserve the number retain
    const expected = new Delta().retain(1, { bold: true });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});