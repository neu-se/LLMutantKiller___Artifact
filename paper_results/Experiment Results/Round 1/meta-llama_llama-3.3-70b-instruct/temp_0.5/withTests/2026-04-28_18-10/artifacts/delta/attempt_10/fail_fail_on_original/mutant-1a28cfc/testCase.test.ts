import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose function', () => {
  it('should correctly handle composing a Delta with an embed and a Delta with a string', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ embed: 'test' });
    const delta2 = new Delta().retain('test');
    expect(() => delta1.compose(delta2)).toThrowError('cannot retain a string');
  });
});