import { parse } from '../crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = 'example.com';
    const resultOriginal = parse(url);
    expect(resultOriginal.url).toBe('http://example.com');
    
    // Manually modify the parse function to simulate the mutation
    const originalPlaceholder = 'if (!/^\.*\/|^(?!localhost)\\w+:/.test(currentUrlStr))';
    const mutatedPlaceholder = 'if (!/^\.*\/|^(?!localhost)\\w:/.test(currentUrlStr))';
    const parseMutated = parse.toString().replace(originalPlaceholder, mutatedPlaceholder);
    const parseMutatedFunction = new Function('return ' + parseMutated)();
    const resultMutated = parseMutatedFunction(url);
    
    expect(resultOriginal.url).not.toBe(resultMutated.url);
  });
});