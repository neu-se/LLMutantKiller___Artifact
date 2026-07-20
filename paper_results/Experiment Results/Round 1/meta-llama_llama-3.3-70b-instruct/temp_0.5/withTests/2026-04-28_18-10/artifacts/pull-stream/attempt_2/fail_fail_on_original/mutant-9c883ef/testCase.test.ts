import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should find a value when test function returns true', () => {
    let callbackCalled = false;
    let foundValue;
    find(function (data) { return data === 5; }, (err, value) => {
      callbackCalled = true;
      foundValue = value;
    });
    expect(callbackCalled).toBe(true);
    expect(foundValue).toBeUndefined();
  });
});