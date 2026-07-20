import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should handle error callback correctly', () => {
    let callbackCalled = false;
    let callbackError = null;
    const testCallback = (err: any, data: any) => {
      callbackCalled = true;
      callbackError = err;
    };

    const stream = find(() => true, testCallback);
    stream(null, { foo: 'bar' });
    stream(true, null);

    expect(callbackCalled).toBe(true);
    expect(callbackError).toBe(null);
  });
});