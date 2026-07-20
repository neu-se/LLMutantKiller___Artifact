import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find function', () => {
  it('should call the callback with null error and null data when no test function is provided and cb is null', () => {
    let called = false;
    const callback = (err: any, data: any) => {
      expect(err).toBeNull();
      expect(data).toBeNull();
      called = true;
    };

    find(null, null);
    expect(called).toBe(false);

    find(null, callback);
    expect(called).toBe(true);
  });
});