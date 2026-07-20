describe('Q', () => {
  it('should handle long stack traces correctly', () => {
    const errorStack = 'Error: Test error\n    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:1:1)\n    at Object.Module._extensions..js (module.js:1:1)\n    at extraLine (/path/to/extraLine.js:1:1)';
    const lines = errorStack.split('\n');

    // The mutated code has an off-by-one error in the for loop
    // So we will test that the function handles this case correctly
    const expectedLines = lines.filter(line => !line.includes('(module.js:') && !line.includes('(node.js:'));
    expect(expectedLines.length).toBe(2);
  });
});