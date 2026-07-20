import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, 1);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBe(1);
    const parserExit = () => { throw new Error('Parser exit'); };
    const originalParserExit = global.parser_exit;
    global.parser_exit = parserExit;
    const complex2 = new Complex(NaN, NaN);
    global.parser_exit = originalParserExit;
    expect(complex2.re).toBeNaN();
    expect(complex2.im).toBeNaN();
  });
});