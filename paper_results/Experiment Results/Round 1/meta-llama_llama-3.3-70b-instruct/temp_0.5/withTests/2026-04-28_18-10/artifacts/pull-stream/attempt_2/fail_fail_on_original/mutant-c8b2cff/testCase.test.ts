import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the done function with the correct arguments when op returns false', () => {
    const readSpy = jest.fn((abort, cb) => {
      cb(null, 'data');
    });
    const opSpy = jest.fn(() => false);
    const doneSpy = jest.fn();

    drain(opSpy, doneSpy)(readSpy);

    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledWith(null, expect.any(Function));

    expect(opSpy).toHaveBeenCalledTimes(1);
    expect(opSpy).toHaveBeenCalledWith('data');

    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledWith(null);
  });

  it('should call the done function with an error when op returns false and abort is true', () => {
    const readSpy = jest.fn((abort, cb) => {
      cb(abort, 'data');
    });
    const opSpy = jest.fn(() => false);
    const doneSpy = jest.fn();

    drain(opSpy, doneSpy)(readSpy);

    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledWith(null, expect.any(Function));

    expect(opSpy).toHaveBeenCalledTimes(1);
    expect(opSpy).toHaveBeenCalledWith('data');

    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledWith(true);
  });
});