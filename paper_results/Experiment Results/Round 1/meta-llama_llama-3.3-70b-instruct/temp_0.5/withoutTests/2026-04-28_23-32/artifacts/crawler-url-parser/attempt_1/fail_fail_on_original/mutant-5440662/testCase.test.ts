import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a link and a page', () => {
    const linkurl = { url: 'https://www.example.com/aaa/bbb', path: '/aaa/bbb' };
    const pageurl = { url: 'https://www.example.com/aaa/bbb', path: '/aaa/bbb' };
    expect(gettype(linkurl, pageurl)).toBe('samelevel');

    const mutatedLinkurl = { url: 'https://www.example.com/aaa/bbb', path: '/aaa/bbb' };
    const mutatedPageurl = { url: 'https://www.example.com/aaa/bbb', path: 'Stryker was here!' };
    expect(() => gettype(mutatedLinkurl, mutatedPageurl)).toThrowError();
  });
});