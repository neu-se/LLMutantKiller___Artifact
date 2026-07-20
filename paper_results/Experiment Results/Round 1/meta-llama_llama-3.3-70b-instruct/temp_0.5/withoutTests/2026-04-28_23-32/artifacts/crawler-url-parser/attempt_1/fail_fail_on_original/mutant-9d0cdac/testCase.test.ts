import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly parse URLs with protocols other than http/https', () => {
    const url = "ftp://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toBeNull();
  });
});