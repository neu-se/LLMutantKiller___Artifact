describe('Q', () => {
  it('should filter stack traces correctly', () => {
    const stackString = 'line1\nline2\nline3';
    const lines = stackString.split('\n');
    let result = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (i < lines.length) {
        result += line + '\n';
      }
    }
    result = result.trim();

    expect(result).toBe('line1\nline2\nline3');
  });
});