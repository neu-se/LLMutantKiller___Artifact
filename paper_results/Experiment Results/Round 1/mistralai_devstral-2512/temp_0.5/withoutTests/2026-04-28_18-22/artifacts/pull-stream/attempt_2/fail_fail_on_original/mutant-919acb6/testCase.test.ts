import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle non-true end values correctly', (done) => {
    const testValue = 'custom-end';
    let receivedEnd: any = null;
    let receivedData: any[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // First call with data
      cb(null, 'data1');
      // Second call with custom end value (not true, not error)
      cb(testValue);
    };

    const op = (data: any) => {
      receivedData.push(data);
      return true;
    };

    const doneCallback = (end: any) => {
      receivedEnd = end;
      // In original code: end should be null (since testValue !== true)
      // In mutated code: end would be testValue (since testValue !== false)
      expect(receivedEnd).toBeNull();
      expect(receivedData).toEqual(['data1']);
      done();
    };

    const sink = drain(op, doneCallback);
    source(null, sink);
  });
});