import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform an embed change with object', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => (priority ? b : a),
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: { key: 'value' } });
    const b = new Delta().retain({ embed: { key: 'newValue' } });
    const expected = new Delta().retain({ embed: { key: 'newValue' } });
    expect(a.transform(b, true)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});