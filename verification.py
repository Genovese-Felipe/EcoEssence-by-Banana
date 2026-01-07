from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('file:///app/index.html')
        page.wait_for_selector('#value-proposition')
        element = page.query_selector('#value-proposition')
        element.screenshot(path='/home/jules/verification/verification.png')
        browser.close()

if __name__ == '__main__':
    run()
