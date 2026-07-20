import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle objects with both real and imaginary parts', () => {
    const parser_exit = jest.fn();
    const originalParserExit = Complex.parser_exit;
    Complex.parser_exit = parser_exit;
    const complex1 = new Complex({ re: 1 });
    expect(parser_exit).toHaveBeenCalledTimes(1);
    Complex.parser_exit = originalParserExit;
  });
});