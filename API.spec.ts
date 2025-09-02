import { test, expect } from '@playwright/test';
import { data } from 'jquery';
import { title } from 'process';

test('GET', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
    expect ((response).status()).toBe(200)
    const body = await response.json()
    expect (body.id).toBe(1)
    expect (body).toHaveProperty('title')
    console.log('GET OK')
});

test('POST', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', 
        {
            data:
            {
                title: 'Post de prueba',
                body: 'Este es el body simulado',
                userId: 1
            }
        }
    )
    expect ((response).status()).toBe(201)

    const body = await response.json()
    expect(body.title).toBe('Post de prueba')
    expect(body.body).toBe('Este es el body simulado')
    expect(body.userId).toBe(1)
    expect(body).toHaveProperty('id')
    expect(body.id).toBeGreaterThan(0)
    console.log('POST OK')
});

test('PUT', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', 
        {
            data:
            {
                id: 1,
                title: 'Post actualizado',
                body: 'Este es el body actualizado',
                userId: 1
            }
        }
    )
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body.title).toBe('Post actualizado')
    expect(body.body).toBe('Este es el body actualizado')
    expect(body.id).toBe(1)
    console.log('PUT OK')
});

test('DELETE', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toEqual({})
    console.log('DELETE OK')
});

test('Error 404', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999abc')
    expect(response.status()).toBe(404)

    const body = await response.json()
    expect(body).toEqual({})
    console.log('Error 404 OK')
});

test('Error 401 Unauthorized', async ({request}) => {

    const response = await request.get('https://httpstat.us/401')
    expect(response.status()).toBe(401)
    const text = await response.text()
    expect(text).toBe('401 Unauthorized')
})

test('403 Forbidden', async ({request}) => {

    const response = await request.get('https://httpstat.us/403', {        
             headers: {
                Authorization: 'Bearer token-invalido'
                    }
            })
    expect(response.status()).toBe(403)
    const text = await response.text()
    expect(text).toBe('403 Forbidden')
})

test('API Filters', async ({request}) => {

    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(response.status())
    const t = await response.text()
    console.log(t)
    /*expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body.page).toBe(2)
    expect(body.data.length).toBeGreaterThan(0)*/
})




