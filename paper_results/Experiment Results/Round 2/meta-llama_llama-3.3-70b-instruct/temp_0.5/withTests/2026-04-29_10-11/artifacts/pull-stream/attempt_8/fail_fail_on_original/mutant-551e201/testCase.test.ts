import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const err = new Error('Test error');
    const consoleSpy = jest.spyOn(console, 'warn');
    const read = drain(() => {}, null);
    read(err);
    expect(() => {
      read(null);
    }).toThrowError();
    consoleSpy.mockRestore();
  });
});