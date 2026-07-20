import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("crawler-url-parser", () => {
  it("should have stripFragment set to true in result_normalize_options", () => {
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"
    );
    const src = fs.readFileSync(modulePath, "utf8");
    
    // Extract just the options object by running in a sandboxed context
    // Replace module.exports and requires to isolate the options
    const sandbox: any = { result_normalize_options: undefined };
    const wrappedSrc = src
      .replace(/const URL = require\('url'\);/, "const URL = { parse: ()=>{}, format: ()=>{}, resolve: ()=>{} };")
      .replace(/const psl = require\('psl'\);/, "const psl = { parse: ()=>({}) };")
      .replace(/const cheerio = require\('cheerio'\);/, "const cheerio = { load: ()=>({}) };")
      .replace(/module\.exports.*$/gm, "")
      .replace(/if \(!module\.parent\)[\s\S]*$/, "")
      + "\nresult_normalize_options = result_normalize_options;";
    
    try {
      vm.runInNewContext(wrappedSrc, sandbox);
      expect(sandbox.result_normalize_options?.stripFragment).toBe(true);
    } catch(e) {
      // If vm approach fails, fall back to string matching
      const match = src.match(/stripFragment\s*:\s*(true|false)/);
      expect(match?.[1]).toBe("true");
    }
  });
});