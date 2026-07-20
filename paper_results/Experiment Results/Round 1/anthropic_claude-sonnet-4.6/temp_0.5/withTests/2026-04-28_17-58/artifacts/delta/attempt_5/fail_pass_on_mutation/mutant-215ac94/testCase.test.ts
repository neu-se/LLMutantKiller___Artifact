import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('calls embed handler when both ops are embed retains', () => {
    const transformFn = jest.fn((a: Op[], b: Op[], priority: boolean) =>
      new Delta(a).transform(new Delta(b), priority).ops
    );
    
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: transformFn,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    
    a.transform(b, true);
    
    Delta.unregisterEmbed('delta');
    
    expect(transformFn).toHaveBeenCalledTimes(1);
  });
});