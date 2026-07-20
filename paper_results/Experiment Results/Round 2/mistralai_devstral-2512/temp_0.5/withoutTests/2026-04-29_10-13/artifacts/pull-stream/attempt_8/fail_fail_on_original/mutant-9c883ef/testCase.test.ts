import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('find', () => {
  it('should handle missing callback by using test as callback', () => {
    const test = (data: any) => data === 'target';
    let callbackCalled = false;

    const source = values(['a', 'b', 'target', 'c']);

    // This should trigger the mutation where !cb is replaced with false
    const sink = find(test);
    const mockSink = {
      read: (readCb: (end: any, data?: any) => void) => {
        readCb(null, 'target');
      },
      end: (err?: any) => {
        callbackCalled = true;
      }
    };

    sink(mockSink);

    expect(callbackCalled).toBe(true);
  });
});