import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with null error and null data when no callback is provided', (done) => {
    const testFunction = (data: any) => data === 'test';
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      done();
    };

    find(testFunction);
    find(testFunction, callback);
  });
});