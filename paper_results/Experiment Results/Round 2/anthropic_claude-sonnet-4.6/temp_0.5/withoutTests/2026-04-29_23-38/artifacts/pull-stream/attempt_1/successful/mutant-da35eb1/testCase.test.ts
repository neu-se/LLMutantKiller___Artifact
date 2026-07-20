import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js"

describe('find', () => {
  it('should pass actual errors to callback when no match found', (done) => {
    const error = new Error('stream error');
    
    // Create a source that immediately ends with an error
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      cb(error); // end with an actual error
    };
    
    const sink = find((data: any) => data === 'match', (err: any, data: any) => {
      expect(err).toBe(error);
      expect(data).toBeNull();
      done();
    });
    
    sink(source);
  });
});