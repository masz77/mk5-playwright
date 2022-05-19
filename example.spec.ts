const { _electron: electron } = require('playwright');
const { test, expect } = require('@playwright/test');

test('basic test', async () => {
try {
 // Launch Electron app.
  const electronApp = await electron.launch({ 
	executablePath: '/opt/ometadefender-mk5/ui/ui',
	args: ['--disable-dev-shm-usage',
		'--no-sandbox',
		'ELECTRON_ENV=development',
		'.',
],	
	 });

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();
  // Print the title.
  console.log(await window.title());
console.log(await window.url());
  // Capture a screenshot.
  await window.screenshot({ path: 'intro.png' });
  // Direct Electron console to Node terminal.
  window.on('console', console.log);

} catch (err) {
console.log(err)
window.on('console', console.log);
}
});
 
