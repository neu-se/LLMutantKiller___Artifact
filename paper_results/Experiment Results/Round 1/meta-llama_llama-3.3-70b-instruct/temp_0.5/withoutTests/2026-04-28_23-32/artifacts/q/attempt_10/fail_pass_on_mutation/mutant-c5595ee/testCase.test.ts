describe('Q', () => {
  it('should parse stack lines with @ at the start when using .*@ regex', () => {
    const stackLine = '@bar.js:123';
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (!attempt3) {
      throw new Error('Failed to parse stack line');
    }
    expect([attempt3[1], Number(attempt3[2])]).toEqual(['bar.js', 123]);
  });

  it('should not parse stack lines with @ at the start when using .@ regex', () => {
    const stackLine = '@bar.js:123';
    const attempt3 = /.@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
      throw new Error('Should not parse stack line');
    }
  });
});