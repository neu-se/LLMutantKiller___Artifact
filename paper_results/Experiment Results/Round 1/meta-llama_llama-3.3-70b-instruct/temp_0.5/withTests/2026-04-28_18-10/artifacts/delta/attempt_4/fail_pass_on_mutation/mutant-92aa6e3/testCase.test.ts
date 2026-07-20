import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed handler and action check', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().insert('a');
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(() => a.compose(b)).toThrowError('cannot retain a string');

    Delta.unregisterEmbed('delta');
  });
});