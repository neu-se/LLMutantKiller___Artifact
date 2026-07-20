import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { JSDOM } from "jsdom";

describe('extract function test', () => {
    it('should extract urls from html', () => {
        const html = `
            <html>
                <body>
                    <a href="http://www.stackoverflow.com/aaa/bbb/ccc">test-link-1</a>
                    <a href="javascript:void(0)">test-link-2</a>
                    <a href="ftp://www.stackoverflow.com/questions.exe">test-link-3</a>
                </body>
            </html>
        `;
        const dom = new JSDOM(html);
        const result = extract(dom.window.document.body.innerHTML, "http://www.stackoverflow.com/aaa/bbb/ccc");
        expect(result.length).toBe(1);
    });
});