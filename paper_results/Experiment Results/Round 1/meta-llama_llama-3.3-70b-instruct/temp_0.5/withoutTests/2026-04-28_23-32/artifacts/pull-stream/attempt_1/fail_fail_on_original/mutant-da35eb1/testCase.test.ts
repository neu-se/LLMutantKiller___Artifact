import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call callback with error when error occurs', (done) => {
    const error = new Error('Test error');
    const callback = jest.fn();
    const asyncIterable = {
      [Symbol.asyncIterator]() {
        return {
          next() {
            return Promise.resolve({ done: true, value: undefined });
          },
          throw(error) {
            return Promise.resolve({ done: true, value: undefined });
          },
          return() {
            return Promise.resolve({ done: true, value: undefined });
          }
        };
      }
    };

    find(asyncIterable, (err, data) => {
      callback(err, data);
      done();
    });

    asyncIterable[Symbol.asyncIterator]().throw(error);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(error, null);
  });
});