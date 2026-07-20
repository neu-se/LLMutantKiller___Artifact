import { parse } from "../../../crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URL with fragment', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager#t";
    const result = parse(url);
    expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager#t");
  });
});