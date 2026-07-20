import * as findModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call callback with error when error occurs', () => {
    const error = new Error('Test error');
    const callback = jest.fn();
    const asyncIterable = {
      [Symbol.asyncIterator]() {
        return {
          next() {
            return Promise.resolve({ done: true, value: undefined });
          },
          throw(error: any) {
            return Promise.resolve({ done: true, value: undefined });
          },
          return() {
            return Promise.resolve({ done: true, value: undefined });
          }
        };
      }
    };

    findModule.default(asyncIterable, (err: any, data: any) => {
      callback(err, data);
    });

    asyncIterable[Symbol.asyncIterator]().throw(error);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null, null);
  });
});