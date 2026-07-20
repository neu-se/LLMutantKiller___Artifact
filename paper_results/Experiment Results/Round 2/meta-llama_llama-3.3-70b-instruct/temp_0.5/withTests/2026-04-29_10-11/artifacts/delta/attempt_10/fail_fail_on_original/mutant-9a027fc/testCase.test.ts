import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should throw an error when otherData is an object with a different key', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => (priority ? b : a),
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: { key: 'value' } });
    const b = new Delta().retain({ other: { key: 'newValue' } });
    expect(() => a.transform(b, false)).toThrowError('embed types not matched');
    Delta.unregisterEmbed('embed');
  });
});