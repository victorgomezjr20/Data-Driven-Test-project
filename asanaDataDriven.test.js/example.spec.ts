const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

// Define the test suite
test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test(`${data.name}`, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        // Navigate to Asana login page
        await page.goto('https://app.asana.com/-/login', { waitUntil: 'domcontentloaded' });
       
        // Fill in and submit login form
        await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
        await page.getByRole('button', {name: 'Continue', exact:true}).click();
        await page.fill('input[type="password"]', 'Password123');
        await page.getByRole('button', {name: 'Log in'}).click();        
        await page.waitForNavigation();
      });

      await test.step(`Navigate to "${data.leftNav}"`, async () => {
        // Click on left nav
        await page.getByRole('link', {name:data.leftNav}).click();
      });

      await test.step(`Verify "${data.card_title}" in "${data.column}" column`, async () => {

        // Create locator for column
        const columnLocator = page.locator('.BoardColumn.BoardBody-column', {hasText:data.column});

        // Create locator for card in column
        const cardLocator = columnLocator.locator('.BoardCard-taskName', {hasText: data.card_title })

        // Verify column is visible
        await expect(columnLocator).toBeVisible();

        // Verify card is visible 
        await expect(cardLocator).toBeVisible();
      });

    });
  });
});