import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('does not call embed handler when thisOp has numeric retain', () => {
    const transformFn = jest.fn();
    Delta.registerEmbed('image', {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: transformFn,
    });

    const a = new Delta().retain(3);
    const b = new Delta().retain({ image: 'data' });

    a.transform(b);
    
    expect(transformFn).not.toHaveBeenCalled();

    Delta.unregisterEmbed('image');
  });
});