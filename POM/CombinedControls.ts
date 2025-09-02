import { expect, Locator, Page } from "@playwright/test";

export class CombinedControls{

    private usuario!: Locator
    private contraseña!: Locator
    private botoningreso!: Locator
    private msjexito!: Locator
    private msjeerror!: Locator
    private botonsalir!: Locator

    constructor(private page: Page){
        this.initLocators()
    }

    async initLocators(){
        this.usuario = this.page.getByRole('textbox', {name: 'Username'})
        this.contraseña = this.page.getByRole('textbox', {name: 'Password'})
        this.botoningreso = this.page.locator('button[type="submit"]')
        this.msjexito = this.page.locator('#flash.flash.success')
        this.msjeerror = this.page.locator('#flash.flash.error')
        this.botonsalir = this.page.locator('a.button.secondary.radius')
    }

    async hacerLoginfallido(usuario:string, contraseña: string){
        await this.usuario.fill(usuario)
        await this.contraseña.fill(contraseña)
        await this.botoningreso.click()
    }

    async getErrormessage(){
        await expect(this.msjeerror).toContainText('Your username is invalid!')
    }

    async hacerLoginexitoso(usuario, contraseña){
        await this.usuario.fill(usuario)
        await this.contraseña.fill(contraseña)
        await this.botoningreso.click()
    }

    async getSuccessmessage(){
        await expect(this.msjexito).toContainText('You logged into a secure area!')
    }

    async hacerLogout(){
        await this.botonsalir.click()
        await expect(this.msjexito).toContainText('You logged out of the secure area!')
    }  
}