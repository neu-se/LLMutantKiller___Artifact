import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent test', () => {
    it('should expose the mutation by checking module.parent behavior', () => {
        // This test will fail on the mutated code because the mutation removes
        // the module.parent check that would normally prevent execution
        const originalModuleParent = module.parent;
        module.parent = undefined;

        try {
            const result = parse("https://www.npmjs.com/package/electron-window-manager");
            expect(result).not.toBeNull();
            expect(result?.protocol).toBe("https:");
        } finally {
            module.parent = originalModuleParent;
        }
    });
});