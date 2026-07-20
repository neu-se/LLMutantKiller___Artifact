import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the read function with the correct arguments when op returns false', () => {
    const readSpy = jest.fn();
    const opSpy = jest.fn(() => false);
    const doneSpy = jest.fn();

    drain(opSpy, doneSpy)(readSpy);

    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledWith(null, expect.any(Function));

    const readCallback = readSpy.mock.calls[0][1];
    readCallback(null, 'data');

    expect(readSpy).toHaveBeenCalledTimes(2);
    expect(readSpy).toHaveBeenCalledWith(abort, doneSpy);
    expect(opSpy).toHaveBeenCalledTimes(1);
    expect(opSpy).toHaveBeenCalledWith('data');
    expect(doneSpy).toHaveBeenCalledTimes(0);
  });
});