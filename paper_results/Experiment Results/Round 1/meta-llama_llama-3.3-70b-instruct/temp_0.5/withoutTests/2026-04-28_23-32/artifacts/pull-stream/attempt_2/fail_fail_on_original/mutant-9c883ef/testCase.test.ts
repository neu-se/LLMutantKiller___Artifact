import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback function with the correct data when test function returns true', () => {
    const callbackFunction = jest.fn();
    const dataStream = ['test1', 'test', 'test3'];

    find('test', callbackFunction);

    expect(callbackFunction).toHaveBeenCalledTimes(1);
    expect(callbackFunction).toHaveBeenCalledWith(null, 'test');
  });
});