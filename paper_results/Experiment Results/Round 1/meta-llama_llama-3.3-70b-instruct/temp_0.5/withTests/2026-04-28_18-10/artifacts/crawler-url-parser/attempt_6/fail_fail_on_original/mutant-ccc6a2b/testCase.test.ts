import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import fs from 'fs';

describe('parse url', function () {
    it('should have a debugger statement in the source code', function () {
        const filePath = require.resolve("../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
        const fileContent = fs.readFileSync(filePath, 'utf8');
        expect(fileContent).toContain('debugger');
    });
});