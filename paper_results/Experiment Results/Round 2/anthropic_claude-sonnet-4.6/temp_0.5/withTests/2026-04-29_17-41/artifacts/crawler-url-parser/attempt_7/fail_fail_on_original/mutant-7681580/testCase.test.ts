it('should return null for ws:// URL', () => {
  const result = parse("ws://example.com");
  expect(result).toBeNull();
});