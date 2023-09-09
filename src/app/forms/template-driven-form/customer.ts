export class Customer {
  constructor(
    public firstName = '',
    public lastName = '',
    public email = '',
    public sendCatalog = false,
    public addressType = 'home',
    public street1?: string,
    public street?: string,
    public city?: string,
    public state = '',
    public zip?: string
  ) {}
}
