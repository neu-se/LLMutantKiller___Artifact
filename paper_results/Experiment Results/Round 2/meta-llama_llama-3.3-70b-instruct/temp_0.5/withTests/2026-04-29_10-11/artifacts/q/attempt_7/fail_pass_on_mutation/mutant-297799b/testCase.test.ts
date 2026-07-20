describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const isNodeFrame = (stackLine: string) => stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        const stackLine = "    at browser.js:123:45";
        expect(isNodeFrame(stackLine)).toBe(false);
    });
});