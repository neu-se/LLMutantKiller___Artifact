import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed handler', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return { ...a, ...b };
        }
        return { ...a };
      },
      invert: (a, b) => ({ ...a }),
      transform: (a, b, priority) => ({ ...a }),
    });

    const a = new Delta().insert({ test: { foo: 'bar' } });
    const b = new Delta().retain({ test: { foo: 'baz' } });
    const expected = new Delta().insert({ test: { foo: 'bar' } });
    expect(a.compose(b)).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});