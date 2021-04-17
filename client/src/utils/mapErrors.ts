export const mapErrors = (errors: any) => {
    let mappedErrors: any = {}
    
    errors.message.map((err: any) => {
        switch (err.property) {
            case "email":
                mappedErrors.email = Object.values(err.constraints).toString()
                break;
            case "firstName":
                mappedErrors.firstName = Object.values(err.constraints).toString()
                break;
            case "lastName":
                mappedErrors.lastName = Object.values(err.constraints).toString()
                break;
            case "nick":
                mappedErrors.nick = Object.values(err.constraints).toString()
                break;
            case "password":
                mappedErrors.password = Object.values(err.constraints).toString()
                break;
        
            default:
                break;
        }
        console.log(Object.values(err.constraints).toString())
    })

    console.log('mappedErrors',mappedErrors)
    return mappedErrors
}