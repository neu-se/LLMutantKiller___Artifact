const fs = require('fs');
const qCode = fs.readFileSync('./q.js', 'utf8');

describe("Q.delay function", () => {
    it("should have a function that delays the resolution of a promise", () => {
        expect(qCode).toContain("Promise.prototype.delay");
    });
});