function numLines(str) {
  return typeof str === 'string' ? (str.match(/\n/g) || []).length + 1 : 0;
}
exports.numLines = numLines;

function getTempDir() {
  // TODO: fix this to return a new directory for each test
  return 'tmp';
}
exports.getTempDir = getTempDir;

// On Windows, symlinks for files need admin permissions. This helper
// skips certain tests if we are on Windows and got an EPERM error
function skipOnWinForEPERM(action, testCase) {
  const ret = action();
  const error = ret.code;
  const isWindows = process.platform === 'win32';
  if (isWindows && error && /EPERM:/.test(error)) {
    console.warn('Got EPERM when testing symlinks on Windows. Assuming non-admin environment and skipping test.');
  } else {
    testCase();
  }
}
exports.skipOnWinForEPERM = skipOnWinForEPERM;
