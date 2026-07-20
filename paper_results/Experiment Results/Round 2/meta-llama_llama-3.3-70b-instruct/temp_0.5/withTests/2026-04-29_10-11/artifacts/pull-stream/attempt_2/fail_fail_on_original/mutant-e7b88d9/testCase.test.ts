import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should call the callback with the correct data when the test function returns false', () => {
    let callbackCalled = false;
    const read = take(5, { last: true });
    read(null, (end, data) => {
      if (end) {
        callbackCalled = true;
      }
    });
    read(null, (end, data) => {
      if (end) {
        callbackCalled = true;
      }
    });
    read(null, (end, data) => {
      if (end) {
        callbackCalled = true;
      }
    });
    read(null, (end, data) => {
      if (end) {
        callbackCalled = true;
      }
    });
    read(null, (end, data) => {
      if (end) {
        callbackCalled = true;
      }
    });
    expect(callbackCalled).toBe(true);
  });
});