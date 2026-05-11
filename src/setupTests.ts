import '@testing-library/jest-dom';

// Suppress ReactDOMTestUtils.act deprecation noise from older
// @testing-library/react internals against React 18.
const originalError = console.error.bind(console.error);
beforeAll(() => {
  console.error = (msg: string, ...args: unknown[]) => {
    if (typeof msg === 'string' && (
      msg.includes('ReactDOMTestUtils.act` is deprecated') ||
      msg.includes('A suspended resource finished loading inside a test')
    )) return;
    originalError(msg, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
