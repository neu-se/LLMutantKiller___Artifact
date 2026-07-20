import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find', () => {
  it('should handle missing callback by using test as callback', () => {
    const test = (data: any) => data === 'target';
    let callbackCalled = false;
    let callbackData: any = null;

    const mockSink = {
      read: (readCb: (end: any, data?: any) => void) => {
        readCb(null, 'target');
      },
      end: (err?: any) => {
        callbackCalled = true;
      }
    };

    // This should trigger the mutation where !cb is replaced with false
    const sink = find(test);
    sink(mockSink);

    expect(callbackCalled).toBe(true);
  });
});