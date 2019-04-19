const URL  = "http://localhost:1234/users"

//`${URL} + ?username= + ${name}`

function handleHttpErrors(res) {
    if (!res.ok) {
        console.log(res);
      return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}


class loginFacade {
    makeOptions(method,body) {
      var opts = {
        method: method,
        headers: {
          "Content-type": "application/json",
          'Accept': 'application/json',
        }
      }
     
      if (body) {
        opts.body = JSON.stringify(body);
        console.log(body)
      }
      return opts;
      
}


login = async (userName,password,longitude,latitude) =>{
    const options = this.makeOptions("POST",{password,longitude,latitude});
    return await fetch(`${URL}/login/?username=${userName}`,options)
    .then(handleHttpErrors)
}


create = async (firstName,lastName,userName,password,email) =>{


   const options = this.makeOptions("POST",{firstName,lastName,userName,password,email});
   return await fetch(`${URL}/add`,options)
   .then(handleHttpErrors)
   .then(data =>{
     
      console.log(data);
   })

}
}
const facade = new loginFacade();
export default facade;

