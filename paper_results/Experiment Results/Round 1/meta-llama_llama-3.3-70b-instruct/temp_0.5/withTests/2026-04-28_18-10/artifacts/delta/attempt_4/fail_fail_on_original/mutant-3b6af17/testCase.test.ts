import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform function', () => {
  it('should correctly handle embeds when thisData is not an object', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => b,
    });

    const a = new Delta().retain('test');
    const b = new Delta().retain({ embed: { id: 1, value: 'new test' } });
    expect(() => a.transform(b)).toThrowError('cannot retain a string');

    Delta.unregisterEmbed('embed');
  });
});