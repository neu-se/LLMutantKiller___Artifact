describe('Q', () => {
  it('should parse stack lines with characters before @', () => {
    const stackLine = 'a@bar.js:123';
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (!attempt3) {
      throw new Error('Failed to parse stack line');
    }
    expect([attempt3[1], Number(attempt3[2])]).toEqual(['bar.js', 123]);
  });
});