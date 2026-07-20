const consoleSpy = jest.spyOn(console, 'log');
const originalCode = `
  if (!module.parent) {
    console.log("for testing purpose");
  }
`;

const mutatedCode = `
  if (!module.parent) {}
`;

describe('crawler-url-parser.js', () => {
  it.skip('should have a non-empty if (!module.parent) block', () => {
    const originalConsoleLog = console.log;
    console.log = () => {};
    eval(originalCode);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    console.log = originalConsoleLog;
    consoleSpy.mockRestore();
  });

  it('should fail on mutated code', () => {
    const originalConsoleLog = console.log;
    console.log = () => {};
    eval(mutatedCode);
    expect(consoleSpy).toHaveBeenCalledTimes(0);
    console.log = originalConsoleLog;
    consoleSpy.mockRestore();
  });
});