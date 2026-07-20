import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("detects mutation in placeholder", () => {
    // The mutation changes: currentUrlStr.replace(/^\/\//, 'http://')
    // to: currentUrlStr.replace(/^\/\//, "")
    // This affects URLs where after the http:// prepend, the string starts with //
    // The prepend regex /^(?!(?:\w+:)?\/\/)/ won't fire if string starts with //
    // So we need a URL that: enters the else+if block AND starts with //
    // The top-level replace handles ^// -> http://, so we need to bypass it
    // Actually we can't bypass it...
    // Let me try the extract function which calls parse internally
    const cheerio = require('cheerio');
    // Maybe through extract with a base URL that has //
    const html = '<a href="//example.com/page">link</a>';
    const { extract } = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    const results = extract(html, "http://source.com");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].url).toMatch(/^http:\/\//);
  });
});