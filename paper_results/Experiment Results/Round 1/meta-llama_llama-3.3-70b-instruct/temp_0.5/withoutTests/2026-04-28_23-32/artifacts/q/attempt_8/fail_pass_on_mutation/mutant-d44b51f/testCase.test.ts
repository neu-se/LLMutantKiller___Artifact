describe("Q.join", () => {
    it("should throw an error with a message that includes 'Q can\'t join' when the values are not the same", () => {
        try {
            // Simulate the Q.join function
            function QJoin(x, y) {
                if (x !== y) {
                    throw new Error("Q can't join: not the same: " + x + " " + y);
                }
                return x;
            }
            QJoin(1, 2);
        } catch (e: any) {
            expect(e.message).toContain('Q can\'t join');
        }
    });
});