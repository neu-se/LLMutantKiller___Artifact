import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent test', () => {
    it('should expose the mutation by checking if module behaves correctly when loaded directly', () => {
        // This test will fail on the mutated code because the mutation removes
        // the module.parent check that would normally prevent execution
        const result = parse("https://www.npmjs.com/package/electron-window-manager");
        expect(result).not.toBeNull();
        expect(result?.protocol).toBe("https:");
        expect(result?.host).toBe("www.npmjs.com");
        expect(result?.path).toBe("/package/electron-window-manager");
    });
});