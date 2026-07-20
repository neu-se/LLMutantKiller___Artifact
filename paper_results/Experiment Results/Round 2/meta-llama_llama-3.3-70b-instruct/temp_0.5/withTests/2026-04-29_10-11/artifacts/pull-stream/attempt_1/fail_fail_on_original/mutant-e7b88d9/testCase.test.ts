import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should call the callback with the correct data when the test function returns false', () => {
    let callbackCalled = false;
    const read = take(function (data) {
      return data < 5;
    }, { last: true });
    read(null, (end, data) => {
      if (end) {
        callbackCalled = true;
      } else if (data === 5) {
        callbackCalled = true;
      }
    });
    expect(callbackCalled).toBe(true);
  });
});