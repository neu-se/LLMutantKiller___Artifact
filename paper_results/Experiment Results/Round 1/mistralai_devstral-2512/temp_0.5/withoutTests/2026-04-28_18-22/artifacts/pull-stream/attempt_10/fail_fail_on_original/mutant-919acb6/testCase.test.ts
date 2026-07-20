import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should handle false end values correctly', (done) => {
    const testValue = false;
    let receivedEnd: any = null;
    let receivedData: any[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // First call with data
      cb(null, 'data1');
      // Second call with false end value
      cb(testValue);
    };

    const op = (data: any) => {
      receivedData.push(data);
      return true;
    };

    const doneCallback = (end: any) => {
      receivedEnd = end;
      // In original code: end should be null (since false !== true)
      // In mutated code: end would be false (since false !== false is false)
      expect(receivedEnd).toBeNull();
      expect(receivedData).toEqual(['data1']);
      done();
    };

    const sink = drain(op, doneCallback);
    source(null, sink);
  });
});