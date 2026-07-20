import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull', () => {
  it('should correctly handle object with source and sink as a stream argument', (done) => {
    const results: number[] = [];

    const source = (() => {
      const values = [1, 2, 3];
      let i = 0;
      return (abort: any, cb: Function) => {
        if (abort) return cb(abort);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    })();

    // s is an object (not a function) with sink and source
    // Original: else if (s && typeof s === 'object') -> true, calls s.sink(read), read = s.source
    // Mutated: else if (s && true) -> true, same behavior for objects
    // Need a case where s is truthy but NOT an object and NOT a function
    // e.g., s is a number - but that makes no sense for a stream
    
    // Actually wait - what if s is a non-plain-object that has sink/source?
    // Let me reconsider: what non-object truthy values could be passed?
    // The mutation changes typeof check, so a non-object non-function truthy value
    // would now try to access .sink on it
    
    // A duplex stream object (has sink and source, is not a function)
    let sinkReceived: Function | null = null;
    
    const duplexObject: any = {
      sink: (read: Function) => {
        sinkReceived = read;
      },
      source: (() => {
        const values = [10, 20, 30];
        let i = 0;
        return (abort: any, cb: Function) => {
          if (abort) return cb(abort);
          if (i >= values.length) return cb(true);
          cb(null, values[i++]);
        };
      })()
    };

    const resultRead = pull(source, duplexObject);

    resultRead(null, function next(end: any, data: any) {
      if (end) {
        expect(results).toEqual([10, 20, 30]);
        expect(sinkReceived).not.toBeNull();
        done();
        return;
      }
      results.push(data);
      resultRead(null, next);
    });
  });
});