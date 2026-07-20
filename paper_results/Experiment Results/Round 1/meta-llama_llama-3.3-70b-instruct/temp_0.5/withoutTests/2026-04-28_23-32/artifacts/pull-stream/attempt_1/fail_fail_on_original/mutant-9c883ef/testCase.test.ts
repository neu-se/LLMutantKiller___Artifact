import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback function with the correct data when test function returns true', () => {
    const testFunction = (data: any) => data === 'test';
    const callbackFunction = jest.fn();
    const dataStream = ['test1', 'test', 'test3'];

    const readStream = {
      read: () => {
        return dataStream.shift();
      },
    };

    const drainFunction = jest.fn((data: any) => {
      if (testFunction(data)) {
        callbackFunction(null, data);
        return false;
      }
      return true;
    });

    const findFunction = find(testFunction, callbackFunction);
    findFunction(readStream);

    while (dataStream.length > 0) {
      findFunction(readStream);
    }

    expect(callbackFunction).toHaveBeenCalledTimes(1);
    expect(callbackFunction).toHaveBeenCalledWith(null, 'test');
  });
});