import { parse } from '../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    expect(result.protocol).toBe("https:");
    expect(result.host).toBe("www.npmjs.com");
    expect(result.domain).toBe("npmjs.com");
    expect(result.subdomain).toBe("www");
    expect(result.path).toBe("/package/electron-window-manager");
    expect(result.search).toBe("");
    expect(result.querycount).toBe(0);
  });
});