import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('does not call embed handler when thisData is a number', () => {
    const transformFn = jest.fn((a: unknown, b: unknown, priority: boolean) => b);
    
    Delta.registerEmbed('image', {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: transformFn,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ image: { v: 2 } });

    a.transform(b);
    
    expect(transformFn).not.toHaveBeenCalled();

    Delta.unregisterEmbed('image');
  });
});