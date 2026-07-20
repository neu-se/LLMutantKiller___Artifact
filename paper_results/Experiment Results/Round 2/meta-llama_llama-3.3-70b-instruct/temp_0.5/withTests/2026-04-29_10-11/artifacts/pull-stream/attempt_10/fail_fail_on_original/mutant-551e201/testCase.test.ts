import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = drain(() => {}, null);
    const err = new Error('Test error');
    const consoleSpy = jest.spyOn(console, 'warn');
    try {
      read(err);
      expect(true).toBe(false);
    } catch (e) {
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      consoleSpy.mockRestore();
    }
  });
});