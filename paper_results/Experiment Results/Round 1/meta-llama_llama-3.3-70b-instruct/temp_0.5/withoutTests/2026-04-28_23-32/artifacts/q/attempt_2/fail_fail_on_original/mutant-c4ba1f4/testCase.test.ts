import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call nextTick correctly when setImmediate is available', (done) => {
    const originalSetImmediate = global.setImmediate;
    const callbackSpy = jest.fn();
    global.setImmediate = jest.fn((callback) => {
      callback();
    });

    Q.nextTick(callbackSpy);

    expect(callbackSpy).toHaveBeenCalledTimes(1);

    global.setImmediate = originalSetImmediate;
    done();
  });

  it('should call nextTick correctly when setImmediate is not available', (done) => {
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;
    const callbackSpy = jest.fn();

    global.setImmediate = undefined;
    global.MessageChannel = undefined;

    Q.nextTick(callbackSpy);

    expect(callbackSpy).toHaveBeenCalledTimes(0);

    // We need to wait for the next tick of the event loop
    // to check if the callback was called
    global.setTimeout(() => {
      expect(callbackSpy).toHaveBeenCalledTimes(1);
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;
      done();
    }, 0);
  });
});