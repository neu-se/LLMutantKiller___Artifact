const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source', () => {
  it('should not abort when called with non-abort truthy value', () => {
    const array = [1, 2, 3];
    const source = values(array);

    let callbackInvoked = false;
    let receivedData: number | undefined;
    let receivedEnd: boolean | null = null;

    // Call with a truthy non-abort value (should not trigger abort)
    source({ some: 'object' }, (end: boolean | null, data?: number) => {
      callbackInvoked = true;
      receivedEnd = end;
      receivedData = data;
    });

    expect(callbackInvoked).toBe(true);
    expect(receivedEnd).toBe(null);
    expect(receivedData).toBe(1);
  });
});