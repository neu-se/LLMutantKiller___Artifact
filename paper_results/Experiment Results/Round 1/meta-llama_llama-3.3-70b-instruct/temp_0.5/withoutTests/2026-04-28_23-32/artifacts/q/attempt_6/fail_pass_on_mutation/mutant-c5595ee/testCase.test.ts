describe('Q', () => {
  it('should correctly parse stack lines', () => {
    const stackLine = 'foo@bar.js:123';
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
      expect([attempt3[1], Number(attempt3[2])]).toEqual(['bar.js', 123]);
    } else {
      throw new Error('Failed to parse stack line');
    }
  });

  it.skip('should not parse stack lines with extra characters before @', () => {
    const stackLine = '@bar.js:123';
    const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
      throw new Error('Should not parse stack line');
    }
  });
});