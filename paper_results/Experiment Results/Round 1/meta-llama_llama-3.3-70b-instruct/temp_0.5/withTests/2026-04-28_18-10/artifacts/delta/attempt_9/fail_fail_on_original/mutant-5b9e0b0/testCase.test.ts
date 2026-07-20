import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed and retain', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 1 });
    const result = a.compose(b);
    const action = thisOp => thisOp.retain == null ? 'insert' : 'retain';
    expect(action).toBe('retain');
    Delta.unregisterEmbed('embed');
  });
});