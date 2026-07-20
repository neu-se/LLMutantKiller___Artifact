import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error correctly', () => {
    const error = true;
    const callback = jest.fn((err: any, data: any) => {
      if (err === true) {
        expect(err).toBeNull();
      } else {
        expect(err).toBeNull();
        expect(data).toBeNull();
      }
    });
    const test = () => true;
    findModule.default(test, callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});