import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex anchor behavior', () => {
  it('should preserve query parameters that contain utm_ but do not start with utm_', () => {
    const html = `<html><body>
      <a href="http://www.example.com/page?xutm_source=google">link with xutm_source param</a>
    </body></html>`;
    
    const sourceUrl = 'http://www.example.com/';
    const results = extract(html, sourceUrl);
    
    // The URL with ?xutm_source=google should be present
    // Original regex /^utm_\w+/i only removes params starting with utm_
    // so xutm_source should NOT be removed
    // Mutated regex /utm_\w+/i removes params containing utm_ anywhere
    // so xutm_source WOULD be removed
    const urlWithXutm = results.find((r: any) => r.url.includes('xutm_source'));
    expect(urlWithXutm).toBeDefined();
    expect(urlWithXutm!.url).toContain('xutm_source=google');
  });
});