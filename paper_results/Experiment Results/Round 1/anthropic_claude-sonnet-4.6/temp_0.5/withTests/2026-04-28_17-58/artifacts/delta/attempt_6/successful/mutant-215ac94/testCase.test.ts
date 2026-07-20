import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('does not apply embed transform when thisData is numeric', () => {
    // Directly set handler to avoid any registerEmbed issues
    const handlers = (Delta as any).handlers;
    const mockTransform = jest.fn(() => ({ result: 'mock' }));
    handlers['undefined'] = {
      compose: jest.fn(),
      transform: mockTransform,
      invert: jest.fn(),
    };

    const a = new Delta().retain(1);
    const b = new Delta([{ retain: {} as Record<string, unknown> }]);
    const result = a.transform(b, true);

    delete handlers['undefined'];

    // Original: typeof 1 !== 'object' → skip block → transformedData = {} → result has retain({})
    // Mutated: enter block → Object.keys(1) = [] → undefined === undefined → handler called
    //          → transformedData = { undefined: { result: 'mock' } } → different result
    expect(result).toEqual(new Delta([{ retain: {} as Record<string, unknown> }]));
  });
});