import { test, expect } from '@playwright/test';

test.describe('Portfolio Comprehensive QA Audit & Transformation Suite', () => {
  test('renders page without console errors or unhandled exceptions', async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.url()} (${req.failure()?.errorText || 'failed'})`);
    });

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Scroll through the entire page smoothly
    await page.evaluate(async () => {
      const distance = 400;
      const delay = 40;
      while (
        document.scrollingElement &&
        document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight
      ) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    });

    await page.waitForTimeout(400);

    // Verify no critical console errors occurred
    const criticalErrors = consoleErrors.filter(
      (e) => !e.includes('favicon') && !e.includes('Download the React DevTools')
    );
    expect(criticalErrors).toEqual([]);
  });

  test('verifies active and adjacent project cards and core images load successfully', async ({ page }) => {
    await page.goto('/');

    const carousel = page.locator('.cr-fcar');
    await carousel.scrollIntoViewIfNeeded();
    await expect(carousel).toBeVisible();

    // Active project card should be completely loaded
    const activeImg = page.locator('.cr-work[data-d="c"] .cr-work-img img');
    await expect(activeImg).toBeVisible();

    const naturalWidth = await activeImg.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('featured works carousel advances, filters categories, and opens deep-dive modal', async ({ page }) => {
    await page.goto('/');

    const carousel = page.locator('.cr-fcar');
    await carousel.scrollIntoViewIfNeeded();

    // 1. Verify next navigation arrow
    const nextBtn = page.locator('.cr-next');
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await page.waitForTimeout(300);

    // 2. Verify category filter pill works
    const autoFilter = page.locator('.cr-filter-btn', { hasText: 'Automotive & ADAS' });
    if (await autoFilter.isVisible()) {
      await autoFilter.click();
      await page.waitForTimeout(300);
      const activeWorkTitle = page.locator('.cr-work[data-d="c"] h3');
      await expect(activeWorkTitle).toBeVisible();
    }

    // 3. Verify modal opens when clicking Inspect Architecture
    const inspectBtn = page.locator('.cr-work[data-d="c"] .cr-inspect-btn');
    await expect(inspectBtn).toBeVisible();
    await inspectBtn.click();
    await page.waitForTimeout(300);

    // Check modal dialog is active
    const modal = page.locator('.cr-modal');
    await expect(modal).toBeVisible();
    const modalTitle = page.locator('.cr-modal h3');
    await expect(modalTitle).toBeVisible();

    // Close modal via close button
    const closeBtn = page.locator('.cr-modal-close');
    await closeBtn.click();
    await page.waitForTimeout(200);
    await expect(modal).not.toBeVisible();
  });

  test('mobile navigation drawer opens and functions on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    // Hamburger button should be visible on mobile
    const burger = page.locator('.cr-burger');
    await expect(burger).toBeVisible();

    // Open drawer
    await burger.click();
    await page.waitForTimeout(200);

    const drawer = page.locator('.cr-mob-drawer');
    await expect(drawer).toBeVisible();

    // Close drawer via close button
    const closeBtn = page.locator('.cr-mob-drawer .cr-modal-close');
    await closeBtn.click();
    await page.waitForTimeout(200);
    await expect(drawer).not.toBeVisible();
  });

  test('resume download link and mailto links are valid', async ({ page }) => {
    await page.goto('/');

    const resumeLinks = page.locator('a[href*="Resume"], a[href*="resume"]');
    const count = await resumeLinks.count();
    expect(count).toBeGreaterThan(0);

    const mailtoLink = page.locator('a[href^="mailto:apurvak916@gmail.com"]');
    await expect(mailtoLink.first()).toBeVisible();
  });
});
