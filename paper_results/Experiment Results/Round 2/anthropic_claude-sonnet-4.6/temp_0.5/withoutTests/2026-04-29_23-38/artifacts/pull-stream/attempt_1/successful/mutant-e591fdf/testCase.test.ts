import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull mutation detection', () => {
  it('should not treat a non-function with length 1 as a partial sink creator', () => {
    // Create a simple through stream (function with length 1)
    // but pass a non-function object as the first argument
    // In the original: typeof a === 'function' is false, so skip partial sink branch
    // In the mutated: true && a.length === 1 is true, so enter partial sink branch
    
    const nonFunctionSource = {
      length: 1,
      source: function(read: Function) { return read; }
    };
    
    // In original code: a is not a function, so it won't enter the partial sink branch
    // It will check if read.source is a function, and set read = read.source
    // Result should be a function (the source function), not a partial sink
    
    const result = pull(nonFunctionSource);
    
    // In original: result = nonFunctionSource.source (a function that takes read)
    // In mutated: result = a partial sink function (that expects a read argument)
    // Both return functions, but they behave differently
    
    // The original result (nonFunctionSource.source) when called with a read function
    // should return that read function unchanged
    const mockRead = (end: any, cb: Function) => {};
    const resultOfCall = result(mockRead);
    
    // In original: nonFunctionSource.source(mockRead) returns mockRead
    // In mutated: the partial sink function is called with mockRead, 
    //             which then calls pull(mockRead, nonFunctionSource) - different behavior
    expect(resultOfCall).toBe(mockRead);
  });
});