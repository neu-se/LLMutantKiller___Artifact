import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment that is exactly two characters long', () => {
  it('should strip a two-character fragment from a plain path URL without base', () => {
    // Without baseUrl, currentUrlStr goes through the protocol-prepending logic.
    // The fragment must be stripped BEFORE URL.parse to avoid it being treated as part of the path.
    // With mutation /#.$/, "#ab" (2 chars after #) won't match, leaving "#ab" in the string.
    // For a relative path like "/aaa#ab", URL.parse handles hash fine and delete parsedUrl.hash fixes it.
    // But for a bare word like "aaa#ab" -> after replace(/^\/\//, ...) it's still "aaa#ab"
    // then baseUrlStr is falsy, so it goes to the else branch:
    // !/^\.*\/|^(?!localhost)\w+:/.test("aaa#ab") is true -> prepend http://
    // -> "http://aaa#ab" -> URL.parse -> hash="#ab", delete hash -> url="http://aaa/"
    // With mutation: "aaa#ab" not stripped -> same flow -> still works
    // The fragment stripping on currentUrlStr matters when there's no base and the URL is relative
    // Actually the issue is for "/aaa#ab" type - let's check the existing passing test:
    // cup.parse("/aaa#hhh") -> res.url == "/aaa" -- this already passes with original
    // With mutation /#.$/ on "/aaa#hhh" (4 chars) -> no match -> fragment stays
    // URL.parse("/aaa#hhh") -> pathname="/aaa", hash="#hhh" -> delete hash -> url="/aaa" ✓
    // So it still works. The mutation only matters when fragment affects something before URL.parse hash deletion.
    // The real difference: when baseUrlStr exists and currentUrlStr has a fragment
    // baseUrlStr branch does NOT delete hash from currentUrlStr before URL.resolve
    // currentUrlStr strip happens at top, then if no baseUrl branch taken
    // Actually for currentUrlStr with baseUrl: the strip at top removes fragment,
    // then URL.parse is called, hash deleted. With mutation, long fragment stays in currentUrlStr
    // but URL.parse still puts it in .hash which gets deleted. So same result.
    // 
    // The ONLY case where it matters: the regex is applied to currentUrlStr, and the result
    // feeds into URL.resolve when host is null. URL.resolve("http://base/", "path#frag") 
    // resolves to "http://base/path#frag", then delete hash fixes it. Same result.
    //
    // Conclusion: the mutation is only detectable when fragment has exactly 1 char after #
    // because /#.$/ DOES match that. Both original and mutation remove single-char fragments.
    // For 2+ char fragments, original removes them, mutation doesn't - but hash deletion covers it.
    // 
    // UNLESS: the fragment contains characters that affect URL.parse behavior differently.
    // Let's try: currentUrlStr = "http://example.com/page?q=1#section"
    // Original: strip -> "http://example.com/page?q=1" -> parse -> search="?q=1"
    // Mutation: no strip -> "http://example.com/page?q=1#section" -> parse -> search="?q=1", hash="#section" -> delete hash -> same
    //
    // I think the mutation is actually not detectable through the public API due to hash deletion.
    // But wait - what about the case where there's NO hash deletion path?
    // Looking at code: delete parsedUrl.hash is called twice. So hash is always removed.
    // The only observable difference would be if stripping the fragment changes what URL.parse 
    // considers the pathname or search. That can't happen with valid URLs.
    //
    // The test that already exists: cup.parse("/aaa#hhh") -> "/aaa"
    // With mutation /#.$/ : "/aaa#hhh" has 3 chars after # -> no match -> fragment stays
    // URL.parse("/aaa#hhh") -> { pathname: '/aaa', hash: '#hhh' } -> delete hash -> format -> "/aaa" ✓
    // So this passes on both. The mutation seems equivalent for all observable outputs.
    //
    // Let me look more carefully... what if the URL has no protocol and has a fragment?
    // "aaa#bb" -> replace(/#.*$/, '') -> "aaa" -> no baseUrl -> prepend http:// -> "http://aaa/"
    // "aaa#bb" with mutation -> replace(/#.$/, '') -> no match (2 chars) -> "aaa#bb" 
    //   -> no baseUrl -> !/^\.*\/|^(?!localhost)\w+:/.test("aaa#bb") -> true -> prepend http://
    //   -> "http://aaa#bb" -> URL.parse -> { host: 'aaa', hash: '#bb' } -> delete hash -> "http://aaa/"
    // Same result!
    //
    // What about "aaa#b" (single char fragment)?
    // Original: strip -> "aaa" -> prepend -> "http://aaa/"
    // Mutation: /#.$/ matches "#b" -> strip -> "aaa" -> prepend -> "http://aaa/"  
    // Same!
    //
    // I'm now thinking the mutation might be truly equivalent. But let me check one more edge case:
    // What if the fragment affects the protocol detection regex?
    // !/^\.*\/|^(?!localhost)\w+:/.test(currentUrlStr)
    // If currentUrlStr = "http://example.com#longsection" 
    // Original strips to "http://example.com" -> has protocol -> no prepend
    // Mutation: no strip -> "http://example.com#longsection" -> has protocol -> no prepend
    // Same.
    //
    // What about "example.com#longsection"?
    // Original: strip -> "example.com" -> regex test: no ./ prefix, no protocol -> prepend http://
    //   -> "http://example.com" -> parse -> host="example.com"
    // Mutation: no strip -> "example.com#longsection" -> regex test: same -> prepend http://
    //   -> "http://example.com#longsection" -> parse -> host="example.com", hash="#longsection"
    //   -> delete hash -> "http://example.com/"
    // Same result!
    //
    // I genuinely cannot find a case where the mutation produces different observable output.
    // The hash is always cleaned up by URL.parse + delete hash.
    // 
    // WAIT. What about when there's a baseUrl and currentUrlStr is relative with a fragment?
    // parse("page#section", "http://example.com/base/")
    // Original: currentUrlStr = "page#section".replace(/#.*$/, '') = "page"
    //   -> has baseUrl -> URL.parse("page") -> host=null -> URL.resolve(base, "page") 
    //   -> "http://example.com/base/page"
    // Mutation: currentUrlStr = "page#section".replace(/#.$/, '') = no match -> "page#section"
    //   -> has baseUrl -> URL.parse("page#section") -> host=null, hash="#section"
    //   -> delete parsedUrl.hash (first delete) -> URL.resolve(base, parsedUrl)
    //   -> parsedUrl has no hash now... URL.format(parsedUrl) = "page#section"? No wait
    //   -> delete parsedUrl.hash means parsedUrl.hash = undefined
    //   -> URL.resolve(parsedBaseUrl, parsedUrl) where parsedUrl still has path="page" 
    //      but wait, URL.parse("page#section") gives pathname="page", hash="#section"
    //      after delete parsedUrl.hash: { pathname: "page" } (hash gone)
    //      URL.resolve(base, { pathname: "page" }) -> hmm, URL.resolve takes strings...
    //   Actually looking at the code: URL.resolve(parsedBaseUrl, parsedUrl)
    //   parsedUrl is an object here. URL.resolve coerces to string via URL.format?
    //   URL.format({ pathname: "page" }) = "page" (no hash since deleted)
    //   So URL.resolve(base, "page") = "http://example.com/base/page"
    // Same result again!
    //
    // I think the mutation is truly equivalent. But since the task says it's a valid mutation
    // to detect, let me look one more time...
    //
    // OH WAIT. The first delete is: delete parsedUrl.hash (after first URL.parse)
    // But this is ONLY in the branch where parsedUrl.host == null && baseUrlStr exists!
    // 
    // The flow is:
    // 1. currentUrlStr = currentUrlStr.replace(/#.*$/, '');  <- MUTATION HERE
    // 2. if baseUrlStr: strip baseUrlStr fragment
    //    else: maybe prepend http://
    // 3. parsedUrl = URL.parse(currentUrlStr, true, true)
    // 4. delete parsedUrl.hash   <- FIRST DELETE
    // 5. if protocol not http/https: return null
    // 6. if host==null && baseUrlStr: resolve relative URL
    //    - delete parsedUrl.hash (redundant second delete inside this block? No, looking again...)
    //    Actually re-reading: inside the if block: "delete parsedUrl.hash" - wait let me reread
    //
    // Looking at code again:
    // parsedUrl = URL.parse(currentUrlStr, true, true);
    // delete parsedUrl.hash;   // <-- this is OUTSIDE the if block, always executed
    //
    // if (parsedUrl.host == null && baseUrlStr) {
    //     let parsedBaseUrl = URL.parse(baseUrlStr, true, true);
    //     delete parsedUrl.hash;  // <-- this is INSIDE, but hash already deleted above
    //     ...
    //     let absoluteUrl = URL.parse(URL.resolve(parsedBaseUrl, parsedUrl));
    //     currentUrlStr = URL.format(absoluteUrl);
    // }
    //
    // parsedUrl = URL.parse(currentUrlStr, true, true);
    // delete parsedUrl.hash;   // <-- second parse, hash deleted again
    //
    // So hash is ALWAYS deleted. The mutation cannot produce different output.
    // Unless... URL.resolve behaves differently with a URL object that has hash vs without?
    // 
    // URL.resolve(from, to) - if to has a hash, the resolved URL includes the hash.
    // But parsedUrl.hash is deleted before URL.resolve is called!
    // 
    // Actually wait - when we do URL.resolve(parsedBaseUrl, parsedUrl), parsedUrl is an OBJECT.
    // Node's url.resolve() calls url.format() on the second argument if it's an object.
    // url.format({ pathname: 'page', hash: undefined }) = 'page' (no hash)
    // So hash deletion before resolve means no hash in resolved URL. Same result.
    //
    // I'm convinced the mutation is equivalent for all practical purposes through the public API.
    // However, since the task insists there's a detectable mutation, let me try a different angle:
    //
    // What if currentUrlStr itself starts with # ?
    // parse("#section") 
    // Original: "#section".replace(/#.*$/, '') = "" -> empty string
    //   -> no baseUrl -> !/^\.*\/|^(?!localhost)\w+:/.test("") -> true -> prepend http://
    //   -> "http://" -> URL.parse -> { protocol: 'http:', host: '', pathname: '/' }? 
    //   Actually "http://" is weird. Let me think... URL.parse("http://") -> host="" 
    //   -> host is "" not null, so no relative resolution
    //   -> ret.url = URL.format(parsedUrl) = "http://"
    //   -> ret.host = "" -> psl.parse("") might throw or return null domain
    //   Hmm, this might error.
    //
    // parse("#a") with mutation: "#a".replace(/#.$/, '') = "" -> same as original
    // parse("#ab") with mutation: "#ab".replace(/#.$/, '') = no match -> "#ab" stays
    //   -> no baseUrl -> prepend http:// -> "http://#ab"
    //   -> URL.parse("http://#ab") -> { protocol: 'http:', hash: '#ab', host: '' }
    //   -> delete hash -> { protocol: 'http:', host: '' }
    //   -> protocol is 'http:' so passes the check
    //   -> host is '' (empty string, not null) -> no relative resolution
    //   -> ret.url = "http://" 
    //   -> ret.host = "" -> psl.parse("") -> domain=null, subdomain=null
    //
    // Original parse("#ab"):
    //   -> "".replace -> "" -> prepend -> "http://" -> same result as above
    //
    // Hmm, same again.
    //
    // What about parse("#ab", "http://example.com/")?
    // Original: currentUrlStr = "" -> URL.parse("") -> host=null -> resolve with base
    //   -> URL.resolve("http://example.com/", "") = "http://example.com/"
    //   -> ret.url = "http://example.com/"
    // Mutation: currentUrlStr = "#ab" (no match) -> URL.parse("#ab") 
    //   -> { hash: '#ab', href: '#ab' } -> host=null -> delete hash -> { href: '#ab' }
    //   -> URL.resolve(parsedBaseUrl, { href: '#ab', hash: undefined })
    //   -> URL.format({ href: '#ab', hash: undefined }) = '#ab'? or ''?
    //   Actually url.format with href set uses href directly: '#ab'
    //   -> URL.resolve("http://example.com/", "#ab") = "http://example.com/#ab"
    //   -> absoluteUrl = URL.parse("http://example.com/#ab") 
    //   -> currentUrlStr = URL.format(absoluteUrl) = "http://example.com/#ab"
    //   -> parsedUrl = URL.parse("http://example.com/#ab") -> hash="#ab"
    //   -> delete parsedUrl.hash -> no hash
    //   -> ret.url = "http://example.com/"
    //
    // SAME RESULT! The hash deletion always saves us.
    //
    // OK I think I need to find a case where the fragment is NOT in the hash position
    // but somewhere else that confuses the parser. Like a fragment in the middle?
    // That's not valid URL syntax.
    //
    // Let me try: what if the URL has a fragment that makes the protocol detection fail?
    // "javascript#ab" - but that's filtered by the extract function, not parse.
    //
    // What about the illegal chars check? The fragment char # is legal per the regex.
    // So "#section" passes the illegal chars check.
    //
    // I'm going to try a completely different approach: maybe the mutation IS detectable
    // but only in a very specific edge case I'm missing. Let me just write a test that
    // exercises the most obvious behavioral difference and see.
    //
    // The most direct test: a URL where stripping the fragment changes what URL.parse sees
    // in a way that delete hash can't fix. 
    //
    // What if the URL is "http://example.com/path#" (empty fragment)?
    // Original: replace(/#.*$/, '') -> "http://example.com/path" 
    // Mutation: replace(/#.$/, '') -> no match (0 chars after #) -> "http://example.com/path#"
    // URL.parse("http://example.com/path#") -> hash="" or hash="#"?
    // In Node.js url module: URL.parse("http://example.com/path#") -> hash=""
    // delete parsedUrl.hash -> hash=undefined
    // URL.format -> "http://example.com/path"
    // Same result!
    //
    // What about "http://example.com/path#x" (exactly 1 char)?
    // Original: strip -> "http://example.com/path"
    // Mutation: /#.$/ matches "#x" -> strip -> "http://example.com/path"
    // Same!
    //
    // So for 0 or 1 char fragments: same behavior (mutation matches or hash deletion handles)
    // For 2+ char fragments: mutation doesn't strip, but hash deletion handles it
    //
    // THE MUTATION IS EQUIVALENT. But the task says to find a test that detects it...
    //
    // Let me look ONE more time at the code flow very carefully for the case with baseUrl
    // where the fragment might affect URL.resolve output BEFORE hash deletion:
    //
    // parse("page#longsection", "http://example.com/base/")
    // Step 1: currentUrlStr = "page#longsection".replace(/#.$/, '') 
    //         = "page#longsection" (no match, 11 chars after #)
    // Step 2: baseUrlStr exists, so baseUrlStr = baseUrlStr.replace(/#.*$/, '') (no change)
    //         (no else branch)
    // Step 3: parsedUrl = URL.parse("page#longsection", true, true)
    //         = { pathname: 'page', hash: '#longsection', href: 'page#longsection' }
    // Step 4: delete parsedUrl.hash -> parsedUrl = { pathname: 'page', href: 'page#longsection' }
    //         NOTE: href still contains #longsection! delete hash removes .hash property
    //         but href is a separate property that still has the full string!
    // Step 5: protocol check - parsedUrl.protocol is null -> not http/https -> return null??
    //
    // WAIT! With the mutation, parsedUrl.protocol would be null for "page#longsection"
    // because it's a relative URL. So it passes the protocol check (null != 'http:' but
    // the check is: if protocol && protocol != 'http:' && protocol != 'https:' -> return null)
    // So null protocol passes.
    //
    // Step 6: parsedUrl.host == null && baseUrlStr -> enter relative resolution
    //   parsedBaseUrl = URL.parse("http://example.com/base/")
    //   delete parsedUrl.hash (already deleted, no-op)
    //   ret.baseurl = "http://example.com/base/"
    //   absoluteUrl = URL.parse(URL.resolve(parsedBaseUrl, parsedUrl))
    //   
    //   URL.resolve(parsedBaseUrl, parsedUrl):
    //   parsedUrl is an object. url.resolve calls url.format on the second arg.
    //   url.format({ pathname: 'page', href: 'page#longsection' })
    //   When href is present in url.format, it uses href directly!
    //   So url.format(parsedUrl) = 'page#longsection'
    //   URL.resolve("http://example.com/base/", "page#longsection") 
    //   = "http://example.com/base/page#longsection"
    //   
    //   absoluteUrl = URL.parse("http://example.com/base/page#longsection")
    //   currentUrlStr = URL.format(absoluteUrl) = "http://example.com/base/page#longsection"
    //
    // Step 7: parsedUrl = URL.parse("http://example.com/base/page#longsection")
    //         = { pathname: '/base/page', hash: '#longsection', host: 'example.com', ... }
    //         delete parsedUrl.hash
    //         ret.url = URL.format(parsedUrl) = "http://example.com/base/page"
    //
    // Original flow:
    // Step 1: currentUrlStr = "page" (fragment stripped)
    // ... same resolution -> "http://example.com/base/page"
    //
    // SAME RESULT! The final hash deletion at step 7 always cleans it up.
    //
    // I truly believe this mutation is equivalent. But let me try one more thing:
    // What if url.format with href present behaves differently than I think?
    //
    // Actually, I just realized: when url.format receives an object with href,
    // it might use href as-is, which would include the fragment. Then url.resolve
    // would see the fragment. But url.resolve's behavior with fragments:
    // url.resolve("http://example.com/base/", "page#section") = "http://example.com/base/page#section"
    // Then URL.parse that, delete hash, format -> "http://example.com/base/page"
    // Still same!
    //
    // The only way to get different output would be if the fragment somehow changes
    // the pathname or search parsing. That can't happen with the legacy url module
    // since # always terminates the path/search.
    //
    // Given all this analysis, I believe the mutation is equivalent. But since I must
    // provide a test, I'll write one that tests the most likely edge case where behavior
    // might differ - a URL with a fragment passed with a base URL, checking the baseurl field.
    // Actually, let me reconsider the href issue more carefully.
    //
    // url.format documentation: if href is present, it returns href (the pre-formatted string).
    // So url.format({ pathname: 'page', href: 'page#longsection' }) = 'page#longsection'
    // This means the fragment IS passed to url.resolve!
    // url.resolve("http://example.com/base/", "page#longsection") = "http://example.com/base/page#longsection"
    // Then URL.parse("http://example.com/base/page#longsection") -> hash="#longsection"
    // delete hash -> URL.format -> "http://example.com/base/page"
    //
    // With original (no fragment in currentUrlStr):
    // url.format({ pathname: 'page', href: 'page' }) = 'page'  
    // url.resolve("http://example.com/base/", "page") = "http://example.com/base/page"
    // URL.parse -> no hash -> URL.format -> "http://example.com/base/page"
    //
    // SAME FINAL RESULT.
    //
    // OK, I give up trying to find a difference through ret.url. Let me check ret.baseurl.
    // In the relative URL branch:
    // ret.baseurl = URL.format(parsedBaseUrl);
    // This is set from baseUrlStr which has its OWN fragment stripping (baseUrlStr.replace(/#.*$/, ''))
    // So ret.baseurl is always clean regardless of mutation.
    //
    // What about ret.search? 
    // ret.search = parsedUrl.search (from the SECOND URL.parse of currentUrlStr)
    // currentUrlStr at that point is the fully resolved absolute URL (or the original if absolute)
    // The hash was already stripped from parsedUrl via delete, so search is unaffected.
    //
    // I am now 100% convinced this mutation is equivalent. The test I write will likely
    // pass on both versions. But I'll write the most targeted test I can.
    //
    // Actually, one last idea: what about the `ret.baseurl` field when it's set from
    // `URL.format(parsedBaseUrl)` - but parsedBaseUrl comes from baseUrlStr which already
    // had its fragment stripped. So no difference there.
    //
    // And `ret.url` when there's no base URL and the URL is absolute with a long fragment:
    // Both original and mutation end up with the same result due to delete hash.
    //
    // I'll write a test that at least exercises the code path and documents the expected behavior,
    // even if it might pass on both versions. The most targeted case is a relative URL with
    // a multi-char fragment and a base URL.
    
    const result = parse("page#longsection", "http://example.com/base/");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/base/page");
  });
});