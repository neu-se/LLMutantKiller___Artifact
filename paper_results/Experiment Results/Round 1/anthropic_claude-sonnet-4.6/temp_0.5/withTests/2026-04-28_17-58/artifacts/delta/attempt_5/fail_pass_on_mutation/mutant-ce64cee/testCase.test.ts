import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta.unregisterEmbed()', () => {
  it('should remove a registered embed handler so that using it afterwards throws an error', () => {
    Delta.registerEmbed<Op[]>('testEmbed', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().insert({ testEmbed: [{ insert: 'a' }] });
    const b = new Delta().retain({ testEmbed: [{ insert: 'b' }] });
    expect(() => a.compose(b)).not.toThrow();

    Delta.unregisterEmbed('testEmbed');

    const c = new Delta().insert({ testEmbed: [{ insert: 'a' }] });
    const d = new Delta().retain({ testEmbed: [{ insert: 'b' }] });
    expect(() => c.compose(d)).toThrow('no handlers for embed type "testEmbed"');
  });
});