import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with the correct data when test function is provided', (done) => {
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