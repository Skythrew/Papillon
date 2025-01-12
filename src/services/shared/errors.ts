export class ErrorServiceUnauthenticated extends Error {
  constructor (service: "pronote"|"ARD"|"turboself"|"skolengo"|"ecoledirecte"|"Multi"|"clicetmiam") {
    super(`${service}: "account.instance" is not defined, you need to authenticate first.`);
    this.name = "ErrorServiceUnauthenticated";
  }
}
