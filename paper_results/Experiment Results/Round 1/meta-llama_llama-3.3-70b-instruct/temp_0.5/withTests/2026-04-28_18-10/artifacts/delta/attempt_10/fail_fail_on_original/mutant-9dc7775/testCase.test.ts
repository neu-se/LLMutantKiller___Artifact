import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when composing two embeds with null value', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const delta1 = new Delta().insert({ embed: null });
    const delta2 = new Delta().retain({ embed: { value: 'b' } });
    expect(() => delta1.compose(delta2)).toThrowError('no handlers for embed type "embed"');
    Delta.unregisterEmbed('embed');
  });
});