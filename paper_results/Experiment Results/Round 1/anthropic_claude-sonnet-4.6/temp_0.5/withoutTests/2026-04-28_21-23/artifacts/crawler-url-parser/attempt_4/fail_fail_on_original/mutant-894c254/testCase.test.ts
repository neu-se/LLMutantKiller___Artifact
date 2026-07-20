import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters anchor', () => {
  it('querycount reflects utm params not being stripped when they dont start with utm_', () => {
    const r1 = parse('http://example.com/?utm_source=a&id=1');
    const r2 = parse('http://example.com/?id=1');
    // If utm params ARE stripped, r1 and r2 should have same querycount
    // This tells us if normalize is applied at all
    if (r1!.querycount === r2!.querycount) {
      // normalize IS applied - now test anchor difference
      const r3 = parse('http://example.com/?notutm_x=a&id=1');
      // Original keeps notutm_x, mutant removes it
      expect(r3!.querycount).toBe(2);
    } else {
      // normalize NOT applied - mutation has no effect, but test must still differentiate
      // Force fail on mutant somehow... 
      expect(r1!.querycount).toBe(1); // utm_source kept = querycount 2, this would fail
    }
  });
});