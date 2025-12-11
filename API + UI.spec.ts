import { test, expect } from '@playwright/test';
import { resolveObjectURL } from 'buffer';

test('API + UI', async ({page, request}) => {

        await page.goto('file:///C:/Users/jcolorado/OneDrive%20-%20ENDAVA/Documents/Automation/html/users.html');
        const APIurl = await request.get('https://jsonplaceholder.typicode.com/users')
        expect(APIurl.status()).toBe(400)
        const APIbody = await APIurl.json()
        
        const rows = page.locator('#user-table tbody tr')
        const totalrows = await rows.count()

        for (let i = 0; i < totalrows; i++){
            const row = rows.nth(i)
            const firstname = await row.locator('td').nth(0).innerText()
            const email = await row.locator('td').nth(1).innerText()
            expect(firstname).toBe(APIbody[i].name)
            expect(email).toBe(APIbody[i].email)
        }
         
        expect(totalrows).toBe(APIbody.length)
        console.log(totalrows, APIbody.length)      
})