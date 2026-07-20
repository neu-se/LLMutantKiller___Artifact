import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform handler falsy check', () => {
  it('should skip transform block when handler is falsy', () => {
    // Directly set a falsy handler to bypass getHandler's throw
    // This tests that if(handler) correctly gates the transform call
    
    // We need getHandler to return something falsy
    // Spy on the private static method
    const getHandlerSpy = jest.spyOn(Delta as any, 'getHandler').mockReturnValue(undefined);
    
    const delta1 = new Delta().retain({ image: { x: 1 } });
    const delta2 = new Delta().retain({ image: { x: 2 } });
    
    // Original: if (handler) with handler=undefined → skip block, transformedData = otherData = {image: {x:2}}
    // Mutated: if (true) → enter block, handler.transform() throws TypeError
    let result: Delta | undefined;
    expect(() => {
      result = delta1.transform(delta2, true) as Delta;
    }).not.toThrow();
    
    expect(result!.ops).toEqual([{ retain: { image: { x: 2 } } }]);
    
    getHandlerSpy.mockRestore();
  });
});