import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('parses http URL with all fields correct', () => {
    const r = parse('http://blog.example.com/post/1?id=5');
    expect(r?.protocol).toBe('http:');
    expect(r?.host).toBe('blog.example.com');
    expect(r?.domain).toBe('example.com');
    expect(r?.subdomain).toBe('blog');
    expect(r?.path).toBe('/post/1');
    expect(r?.search).toBe('?id=5');
    expect(r?.querycount).toBe(1);
  });
});