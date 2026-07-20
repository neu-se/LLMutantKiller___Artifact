describe('Q', () => {
    it('should not have longStackSupport enabled by default and should be enabled when Q_DEBUG is set', () => {
        const Q = require('./q.js');
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        // reload the module to get the updated Q
        delete require.cache[require.resolve('./q.js')];
        const updatedQ = require('./q.js');
        expect(updatedQ.longStackSupport).toBe(true);
    });
});