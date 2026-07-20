import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('calls embed handler with correct arguments when both ops have same embed type', () => {
    const transformFn = jest.fn((a: unknown, b: unknown, priority: boolean) => 
      priority ? a : b
    );
    
    Delta.registerEmbed('image', {
      compose: jest.fn(),
      invert: jest.fn(),
      transform: transformFn,
    });

    const a = new Delta().retain({ image: { version: 1 } });
    const b = new Delta().retain({ image: { version: 2 } });

    // With priority = true, handler returns a (thisData's value)
    const resultWithPriority = a.transform(b, true);
    expect(resultWithPriority.ops).toEqual([{ retain: { image: { version: 1 } } }]);

    // With priority = false, handler returns b (otherData's value)
    const resultWithoutPriority = a.transform(b, false);
    expect(resultWithoutPriority.ops).toEqual([{ retain: { image: { version: 2 } } }]);

    Delta.unregisterEmbed('image');
  });
});