import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback when a callback is provided', (done) => {
    const testFunction = (data: any) => data === 'test';
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBe('test');
      done();
    };

    const stream = find(testFunction, callback);
    stream('test');

    // mutated code should not call the callback with the test function as the first argument
    const mutatedTest = jest.fn();
    find(testFunction, mutatedTest);
    expect(mutatedTest).not.toHaveBeenCalledWith(testFunction);
  });
});