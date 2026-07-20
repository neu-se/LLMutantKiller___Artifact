import { parse } from "./crawler-url-parser";

describe('crawler-url-parser', () => {
  it('should correctly handle url parsing with localhost', () => {
    const url = "://localhost";
    const resultOriginal = parse(url);
    expect(resultOriginal).toBeNull();
  });
});