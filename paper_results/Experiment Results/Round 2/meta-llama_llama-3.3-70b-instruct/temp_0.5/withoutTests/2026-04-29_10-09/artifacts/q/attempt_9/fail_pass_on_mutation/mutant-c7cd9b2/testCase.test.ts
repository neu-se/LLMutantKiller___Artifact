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
                expect(match).not.toBeNull();
                expect(match[1]).not.toBeNull();
                expect(match[2]).not.toBeNull();
            } else {
                expect(stackLine).not.toBeNull();
                expect(stackLine).not.toBeUndefined();
                expect(stackLine).not.toBe('');
                expect(stackLine.length).toBeGreaterThan(0);
                expect(stackLine.trim()).not.toBe('');
                expect(stackLine.trim().length).toBeGreaterThan(0);
                expect(stackLine.trim().length).toBeGreaterThan(1);
                expect(stackLine.trim().length).toBeGreaterThan(2);
                expect(stackLine.trim().length).toBeGreaterThan(3);
                expect(stackLine.trim().length).toBeGreaterThan(4);
                expect(stackLine.trim().length).toBeGreaterThan(5);
                expect(stackLine.trim().length).toBeGreaterThan(6);
                expect(stackLine.trim().length).toBeGreaterThan(7);
                expect(stackLine.trim().length).toBeGreaterThan(8);
                expect(stackLine.trim().length).toBeGreaterThan(9);
                expect(stackLine.trim().length).toBeGreaterThan(10);
                expect(stackLine.trim().length).toBeGreaterThan(11);
                expect(stackLine.trim().length).toBeGreaterThan(12);
                expect(stackLine.trim().length).toBeGreaterThan(13);
                expect(stackLine.trim().length).toBeGreaterThan(14);
                expect(stackLine.trim().length).toBeGreaterThan(15);
                expect(stackLine.trim().length).toBeGreaterThan(16);
                expect(stackLine.trim().length).toBeGreaterThan(17);
                expect(stackLine.trim().length).toBeGreaterThan(18);
                expect(stackLine.trim().length).toBeGreaterThan(19);
                expect(stackLine.trim().length).toBeGreaterThan(20);
                expect(stackLine.trim().length).toBeGreaterThan(21);
                expect(stackLine.trim().length).toBeGreaterThan(22);
                expect(stackLine.trim().length).toBeGreaterThan(23);
            }
        }
    });
});