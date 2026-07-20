// test case
import { testFunction } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('test function', () => {
    it('should pass', () => {
        const consoleLogSpy = jest.spyOn(console, 'log');
        testFunction();
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    });
});