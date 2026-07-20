import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform() embed mutation detection', () => {
  it('transform with number retain against embed retain should not call handler incorrectly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
    
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    
    Delta.unregisterEmbed('delta');
    expect(result).toEqual(expected);
  });
});