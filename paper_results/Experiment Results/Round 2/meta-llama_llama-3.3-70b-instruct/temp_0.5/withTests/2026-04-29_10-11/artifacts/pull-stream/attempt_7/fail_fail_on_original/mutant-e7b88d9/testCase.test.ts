import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should call the callback with the correct data when the test function returns false', () => {
    let callbackCalled = false;
    const read = take(function(data: any) { return data < 5; });
    read(null, (end: any, data: any) => {
      if (end) {
        callbackCalled = true;
      }
    });
    read(true, (end: any, data: any) => {
      if (end) {
        callbackCalled = true;
      }
    });
    expect(callbackCalled).toBe(true);
  });
});