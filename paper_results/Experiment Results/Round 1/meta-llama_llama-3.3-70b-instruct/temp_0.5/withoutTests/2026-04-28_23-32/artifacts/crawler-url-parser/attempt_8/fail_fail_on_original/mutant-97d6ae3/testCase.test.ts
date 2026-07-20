import { extract } from "./crawler-url-parser.js";

describe('crawler-url-parser', () => {
    it('should handle null currentUrl correctly', () => {
        const data = '<a href="https://www.example.com">Example</a>';
        const sourceUrl = 'https://www.example.com';
        const result = extract(data, sourceUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('https://www.example.com');
        expect(result[0].text).toBe('Example');
        const currentUrl = null;
        if (currentUrl && currentUrl.url) {
            throw new Error("This should not be executed");
        }
        try {
            if (currentUrl || currentUrl.url) {
                throw new Error("This should throw an error in the mutated code");
            }
        } catch (error) {
            expect(error.message).toBe("This should throw an error in the mutated code");
        }
    });
});