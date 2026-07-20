import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should warn when no done callback is provided', (done) => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    pull(
      pull.values([1, 2, 3]),
      pull.drain()
    );

    expect(consoleWarnSpy).toHaveBeenCalled();
    const warningMessage = consoleWarnSpy.mock.calls[0][0];
    expect(warningMessage.message).toBe('no done callback supplied');

    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    done();
  });
});