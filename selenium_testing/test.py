from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time
import os

class PasswordManagerTest:
    def __init__(self):
        self.driver = webdriver.Chrome()  
        self.driver.get("http://localhost:5173")  # Replace with your app's URL
        self.wait = WebDriverWait(self.driver, 5)
        self.inject_mock_api()

    def inject_mock_api(self):
        # Inject JavaScript to mock the API call
        mock_script = """
        window.originalFetch = window.fetch;
        window.fetch = function() {
            return new Promise((resolve, reject) => {
                // Mock response data
                const mockResponse = {
                    status: 200,
                    json: () => Promise.resolve({ 
                        success: true, 
                        data: { id: 1, name: 'Mock Password Entry' } 
                    })
                };
                resolve(mockResponse);
            });
        };
        """
        self.driver.execute_script(mock_script)
        print("Mock API injected.")
    def find_element_safe(self, by, value):
        try:
            return self.wait.until(EC.presence_of_element_located((by, value)))
        except TimeoutException:
            print(f"Element not found: {by}={value}")
            return None

    def save_page_source(self):
        with open("page_source.html", "w", encoding="utf-8") as f:
            f.write(self.driver.page_source)
        print("Page source saved to page_source.html")

    def take_screenshot(self):
        self.driver.save_screenshot("screenshot.png")
        print("Screenshot saved as screenshot.png")

    def test_input_fields(self):
        print("Testing input fields...")
        # Test website URL input
        website_input = self.find_element_safe(By.XPATH, "//input[@placeholder='Enter website URL']")
        if website_input:
            website_input.send_keys("https://example.com")
            print("Website URL input found and filled")
        else:
            print("Website URL input not found")

        # Test website Name input
        name_input = self.find_element_safe(By.XPATH, "//input[@placeholder='Enter website Name']")
        if name_input:
            name_input.send_keys("Example Website")
            print("Website Name input found and filled")
        else:
            print("Website Name input not found")

        # Test username input
        username_input = self.find_element_safe(By.XPATH, "//input[@placeholder='Enter username']")
        if username_input:
            username_input.send_keys("testuser")
            print("Username input found and filled")
        else:
            print("Username input not found")

        # Test password input
        password_input = self.find_element_safe(By.XPATH, "//input[@placeholder='Enter password']")
        if password_input:
            password_input.send_keys("testpassword")
            print("Password input found and filled")
        else:
            print("Password input not found")

    def test_password_visibility(self):
        print("Testing password visibility...")
        password_input = self.find_element_safe(By.XPATH, "//input[@placeholder='Enter password']")
        if not password_input:
            print("Password input field not found")
            return

        # Try different selectors for the toggle button
        toggle_button = self.find_element_safe(By.XPATH, "//button[contains(@class, 'absolute')]") or \
                        self.find_element_safe(By.XPATH, "//button[.//img[contains(@alt, 'Password')]]") or \
                        self.find_element_safe(By.XPATH, "//input[@placeholder='Enter password']/following-sibling::button") or \
                        self.find_element_safe(By.CSS_SELECTOR, "button[onclick*='togglePasswordVisibility']")

        if not toggle_button:
            print("Password visibility toggle button not found")
            return

        print("Password visibility toggle button found")

        # Check initial state (password should be hidden)
        print(f"Initial password field type: {password_input.get_attribute('type')}")

        # Toggle visibility
        toggle_button.click()
        time.sleep(0.5)  # Short wait for state to change
        print(f"After first toggle, password field type: {password_input.get_attribute('type')}")

        # Toggle visibility back
        toggle_button.click()
        time.sleep(0.5)  # Short wait for state to change
        print(f"After second toggle, password field type: {password_input.get_attribute('type')}")

    def test_add_password(self):
        print("Starting test_add_password method")
        
        # Fill in the form
        # self.test_input_fields()

        # Click the "Add Password" button
        add_button = self.find_element_safe(By.XPATH, "//button[contains(text(), 'Add Password')]")
        if not add_button:
            print("Add Password button not found. Trying alternative selectors.")
            add_button = self.find_element_safe(By.XPATH, "//button[.//lord-icon[@src='https://cdn.lordicon.com/jgnvfzqg.json']]") or \
                         self.find_element_safe(By.XPATH, "//button[contains(@class, 'bg-green-500')]")
        
        if add_button:
            print("Add Password button found. Attempting to click.")
            add_button.click()
            print("Add Password button clicked.")

            # Wait for the new password card to appear
            try:
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "password-cards"))
                )
                print("New password card detected.")
            except TimeoutException:
                print("Timeout waiting for new password card to appear.")

            # Check if the new password card is added
            password_cards = self.driver.find_elements(By.CLASS_NAME, "password-cards")
            if len(password_cards) > 0:
                print(f"Found {len(password_cards)} password card(s).")
            else:
                print("No password cards found.")
            
            # Additional check: look for any elements that might represent a password card
            possible_card_elements = self.driver.find_elements(By.XPATH, "//div[contains(@class, 'card') or contains(@class, 'password')]")
            if possible_card_elements:
                print(f"Found {len(possible_card_elements)} possible card-like elements.")
            else:
                print("No card-like elements found.")

            if len(password_cards) == 0:
                raise AssertionError("Password card was not added")
        else:
            print("Add Password button not found. Test cannot proceed.")
            raise AssertionError("Add Password button not found")

    def run_tests(self):
        try:
            self.save_page_source()
            self.take_screenshot()
            self.test_input_fields()
            self.test_password_visibility()
            self.test_add_password()
            print("All tests completed successfully.")
        except AssertionError as e:
            print(f"Test failed: {str(e)}")
        except Exception as e:
            print(f"An error occurred: {str(e)}")
        finally:
            self.save_page_source()
            self.take_screenshot()
            self.driver.quit()

if __name__ == "__main__":
    test = PasswordManagerTest()
    test.run_tests()