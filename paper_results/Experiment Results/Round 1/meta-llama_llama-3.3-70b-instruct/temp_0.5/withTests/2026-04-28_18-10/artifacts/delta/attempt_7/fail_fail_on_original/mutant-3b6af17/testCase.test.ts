import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform function', () => {
  it('should correctly handle embeds when thisData is an object and otherData is not', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => b,
    });

    const a = new Delta().retain({ embed: { id: 1, value: 'test' } });
    const b = new Delta().retain(1);
    expect(() => a.transform(b)).toThrowError('cannot retain a number');

    Delta.unregisterEmbed('embed');
  });
});