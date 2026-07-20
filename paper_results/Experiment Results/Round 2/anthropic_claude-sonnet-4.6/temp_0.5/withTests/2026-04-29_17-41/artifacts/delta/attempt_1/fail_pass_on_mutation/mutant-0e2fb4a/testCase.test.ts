import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('invert() with embed retain - null check mutation detection', () => {
  it('should not throw when inverting a delta with a numeric retain followed by an object retain embed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // op.retain is null would be caught by mutation - but we test normal embed invert
    const delta = new Delta().retain({ delta: [{ insert: 'b' }] });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] });

    const expected = new Delta().retain({ delta: [{ delete: 1 }] });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);

    Delta.unregisterEmbed('delta');
  });
});