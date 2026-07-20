describe('Delta', () => {
  it('should only export as a module when module is an object', () => {
    const originalModule = global.module;
    global.module = null;
    const consoleError = console.error;
    console.error = jest.fn();
    const requireDelta = () => {
      require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    };
    expect(requireDelta).toThrow();
    console.error = consoleError;
    global.module = originalModule;
  });
});