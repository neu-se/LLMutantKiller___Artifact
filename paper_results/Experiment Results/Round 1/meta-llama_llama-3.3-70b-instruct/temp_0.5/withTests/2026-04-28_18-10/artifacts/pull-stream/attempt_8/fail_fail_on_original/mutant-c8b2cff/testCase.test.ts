import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the read function with the correct arguments when op returns false', () => {
    const readSpy = jest.fn((abort, cb) => {
      cb(null, 'data');
    });
    const opSpy = jest.fn(() => false);
    const doneSpy = jest.fn();

    const drain = drainModule.default;
    drain(opSpy, doneSpy)(readSpy);

    expect(readSpy).toHaveBeenCalledTimes(2);
    expect(readSpy).toHaveBeenNthCalledWith(1, null, expect.any(Function));
    expect(readSpy).toHaveBeenNthCalledWith(2, expect.anything(), expect.any(Function));

    expect(opSpy).toHaveBeenCalledTimes(1);
    expect(opSpy).toHaveBeenCalledWith('data');

    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledWith(null, 'data');

    // Additional check to ensure the correct argument is passed to read
    const secondCallArgs = readSpy.mock.calls[1];
    expect(secondCallArgs[0]).not.toBe(true);
  });
});