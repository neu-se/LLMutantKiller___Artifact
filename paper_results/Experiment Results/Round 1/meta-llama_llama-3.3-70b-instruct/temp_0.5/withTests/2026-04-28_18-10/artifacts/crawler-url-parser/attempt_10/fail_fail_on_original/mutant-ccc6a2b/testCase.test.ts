import fs from 'fs';

describe('parse url', function () {
    it('should have a specific string in the source code', function () {
        const filePath = __dirname + '/crawler-url-parser.js';
        const fileContent = fs.readFileSync(filePath, 'utf8');
        expect(fileContent).toContain('let url = "https ://www.npmjs.com/package/electron-window-manager";');
    });
});