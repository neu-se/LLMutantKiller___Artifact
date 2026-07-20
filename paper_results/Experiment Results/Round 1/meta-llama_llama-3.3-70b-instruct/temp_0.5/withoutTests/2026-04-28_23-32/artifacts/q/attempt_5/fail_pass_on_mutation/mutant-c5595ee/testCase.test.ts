describe('Q', () => {
  it('should correctly parse stack lines', () => {
    const stackLine = '    at foo (bar.js:123:456)';
    const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
      expect([attempt1[1], Number(attempt1[2])]).toEqual(['bar.js', 123]);
    } else {
      throw new Error('Failed to parse stack line');
    }
  });
});