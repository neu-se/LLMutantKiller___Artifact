import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, NaN);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
    const parserExit = () => { throw new Error('Parser exit'); };
    const originalParserExit = global.parser_exit;
    global.parser_exit = parserExit;
    expect(() => new Complex(NaN, NaN)).toThrowError('Parser exit');
    global.parser_exit = originalParserExit;
  });
});