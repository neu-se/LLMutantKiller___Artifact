import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() calls embed handler transform method', () => {
  it('should invoke the registered handler transform and use its return value', () => {
    const transformMock = jest.fn().mockReturnValue({ result: 'transformed' });
    
    Delta.registerEmbed('myembed', {
      compose: (a: unknown, b: unknown) => b,
      transform: transformMock,
      invert: (a: unknown, b: unknown) => b,
    });

    try {
      const a = new Delta().retain({ myembed: { val: 1 } });
      const b = new Delta().retain({ myembed: { val: 2 } });

      const result = a.transform(b, true);

      // Original: handler.transform called, transformedData uses handler result
      expect(transformMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(new Delta().retain({ myembed: { result: 'transformed' } }));
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});