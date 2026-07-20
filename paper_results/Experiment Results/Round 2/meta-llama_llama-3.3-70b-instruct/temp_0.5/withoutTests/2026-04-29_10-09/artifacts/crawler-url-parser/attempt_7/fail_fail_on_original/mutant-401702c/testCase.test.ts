import { parse } from "../../../crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly handle URLs with colon character', () => {
    const url = ":example.com";
    const result = parse(url);
    expect(result).toBeNull();
  });
});