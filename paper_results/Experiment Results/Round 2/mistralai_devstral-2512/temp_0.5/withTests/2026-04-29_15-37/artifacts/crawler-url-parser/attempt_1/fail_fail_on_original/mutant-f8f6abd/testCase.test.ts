// test/09_undefined-href-test.js

const assert = require('assert');
const cup = require("../");

describe('extract url with undefined href', function() {
    it('should not include links with undefined href in results', function() {
        const html = `
            <html>
                <body>
                    <a href="/valid">Valid Link</a>
                    <a>Undefined Href</a>
                    <a href="http://example.com">Another Valid Link</a>
                </body>
            </html>
        `;
        const result = cup.extract(html, "http://example.com");
        assert.equal(result.length, 2);
        assert.equal(result[0].url, "http://example.com/valid");
        assert.equal(result[1].url, "http://example.com");
    });
});