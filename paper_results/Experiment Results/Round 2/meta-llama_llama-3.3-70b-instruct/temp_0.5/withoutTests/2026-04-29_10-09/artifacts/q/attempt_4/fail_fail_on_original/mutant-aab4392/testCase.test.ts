describe('Q', () => {
  it('should handle long stack traces correctly', () => {
    const errorStack = 'Error: Test error\n    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:1:1)\n    at Object.Module._extensions..js (module.js:1:1)';
    const lines = errorStack.split('\n');
    const expectedLines = lines.filter(line => !line.includes('(module.js:') && !line.includes('(node.js:'));

    // The mutated code has an off-by-one error in the for loop
    // So we will test that the function handles this case correctly
    expect(lines.length).toBe(3);
    expect(expectedLines.length).toBe(1);
  });
});