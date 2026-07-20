import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with null error and the correct data when a test function and callback are provided', (done) => {
    const testFunction = (data: any) => data === 'test';
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe('test');
      done();
    };

    const stream = find(testFunction, callback);
    stream('test');
  });
});