import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull', () => {
  it('should handle object streams with source and sink correctly without double-processing', (done) => {
    const collected: number[] = [];

    // Create a duplex object stream (has both source and sink)
    // In the original: when s is a function, read = s(read), then else if checks typeof s === 'object'
    // A duplex that is also callable as a function would trigger both paths in mutated code
    
    // Create an object with source and sink (not a function)
    // When s is NOT a function, the outer if is skipped entirely
    // So the mutation only matters when s IS a function
    
    // Let's create s that IS a function AND has .sink and .source
    // Original: read = s(read), then else if (s && typeof s === 'object') -> false (s is function), skip
    // Mutated: read = s(read), then else if (s && true) -> true, ALSO calls s.sink(read) and read = s.source
    
    const sinkCalled: any[] = [];
    
    const duplexFunction: any = (read: Function) => {
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    };
    
    duplexFunction.sink = (read: Function) => {
      sinkCalled.push(read);
    };
    
    duplexFunction.source = (abort: any, cb: Function) => {
      cb(true); // immediately end
    };

    const source = (() => {
      const values = [1, 2, 3];
      let i = 0;
      return (abort: any, cb: Function) => {
        if (abort) return cb(abort);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    })();

    const result = pull(source, duplexFunction);
    
    // Original: result is duplexFunction(source) - a through stream reading doubled values
    // Mutated: result is duplexFunction.source - an immediately-ending stream
    
    result(null, function next(end: any, data: any) {
      if (end) {
        // Original: collected should have values [2, 4, 6]
        // Mutated: collected should be empty (source ends immediately)
        expect(collected).toEqual([2, 4, 6]);
        done();
        return;
      }
      collected.push(data);
      result(null, next);
    });
  });
});