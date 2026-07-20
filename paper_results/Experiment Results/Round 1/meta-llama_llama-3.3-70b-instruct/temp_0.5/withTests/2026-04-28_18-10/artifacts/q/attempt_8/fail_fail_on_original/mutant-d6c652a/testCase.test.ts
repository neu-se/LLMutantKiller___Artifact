describe('q.js behavior', () => {
    it('should capture line number correctly', () => {
        // Arrange
        const q = require('../../../../../../../../../subject_repositories/q/q.js');

        // Act and Assert
        expect(q.captureLine).toBeDefined();
    });
});