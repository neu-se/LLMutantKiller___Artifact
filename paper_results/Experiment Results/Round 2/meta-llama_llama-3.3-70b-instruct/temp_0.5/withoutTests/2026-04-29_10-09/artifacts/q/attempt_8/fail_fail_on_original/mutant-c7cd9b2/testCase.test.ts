describe('error handling', () => {
    it('should correctly handle errors', () => {
        try {
            throw new Error('test error');
        } catch (e: any) {
            const stackLines = e.stack.split('\n');
            const stackLine = stackLines[1];
            const regex = /at ([^ ]+):(\d+):(?:\d)$/;
            const match = regex.exec(stackLine);
            if (match) {
                expect(match[0]).not.toBeNull();
                expect(match[1]).not.toBeNull();
                expect(match[2]).not.toBeNull();
                expect(match[1]).toMatch(/[^ ]+/);
                expect(match[2]).toMatch(/\d+/);
                expect(match[1]).not.toBe('');
                expect(match[2]).not.toBe('');
                expect(match[1].length).toBeGreaterThan(0);
                expect(match[2].length).toBeGreaterThan(0);
                expect(parseInt(match[2])).toBeGreaterThan(0);
                expect(match[1]).not.toBeUndefined();
                expect(match[2]).not.toBeUndefined();
                expect(match[1]).not.toBeNaN();
                expect(match[2]).not.toBeNaN();
                expect(typeof match[1]).toBe('string');
                expect(typeof match[2]).toBe('string');
                expect(match[1].trim()).not.toBe('');
                expect(match[2].trim()).not.toBe('');
                expect(!isNaN(parseInt(match[2]))).toBe(true);
                expect(Number.isInteger(parseInt(match[2]))).toBe(true);
                expect(match[1]).not.toBeNull();
                expect(match[2]).not.toBeNull();
                expect(match[1]).not.toBe('');
                expect(match[2]).not.toBe('');
                expect(match[1]).not.toBeUndefined();
                expect(match[2]).not.toBeUndefined();
                expect(match[1]).not.toBeNull();
                expect(match[2]).not.toBeNull();
                expect(match[1]).not.toBe('');
                expect(match[2]).not.toBe('');
                expect(match[1]).not.toBeUndefined();
                expect(match[2]).not.toBeUndefined();
                expect(match[1]).not.toBeNull();
                expect(match[2]).not.toBeNull();
                expect(match[1]).not.toBe('');
                expect(match[2]).not.toBe('');
                expect(match[0]).not.toBeUndefined();
                expect(match[0]).not.toBeNull();
                expect(match[0]).not.toBe('');
            } else {
                throw new Error('Failed to parse stack line');
            }
        }
    });
});