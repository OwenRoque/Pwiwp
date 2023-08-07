async function login() {
  Swal.fire({
    icon: "info",
    text: "cargando ...",
  });
  const response = await easyFetch.fetchData(
    "/api/login",
    {
      email: "login-email",
      password: "login-password",
    },
    "POST",
    true
  );
  if (response && response.status && response.status == "ok") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 2500,
    });
    easyFetch.setCookie("dpwi", response.data.token, (path = "/"));
    setTimeout(() => {
      location.replace("/");
    }, 2000);
  }else{
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Usuario o contraseña incorrecta",
      showConfirmButton: false,
      timer: 2500,
    });
  }
}
function closeSession(){
  easyFetch.setCookie("dpwi", "", (path = "/"));
  location.replace("/");

}
async function register() {
  let password = easyFetch.getById("register-password");
  let rpassword = easyFetch.getById("register-rpassword");
  if (password.value == "" || password.value != rpassword.value) {
    return Swal.fire({
      icon: "error",
      text: "Las contraseñas no coinciden",
    });
  }
  Swal.fire({
    icon: "info",
    text: "registrando ...",
  });
  let response = await easyFetch
    .fetchData(
      "/api/register",
      {
        email: "register-email",
        password: "register-password",
        nickname: "register-nickname",
        firstName: "register-name",
        lastName: "register-lastname",
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  if (response && response.status && response.status == "ok") {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 2500,
    });
    setTimeout(() => {
      location.replace("/");
    }, 2000);

    return;
  }
  return Swal.fire({
    position: "top-end",
    icon: "error",
    title: response.msg ? response.msg : "No se pudo conectar al servidor",
    showConfirmButton: false,
    timer: 2500,
  });
}

async function publish(){
  const contentPublication = easyFetch.getById("publication-content");
  if(contentPublication.value==""){
    return Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Debes agregar contenido a tu publicación",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  Swal.fire({
    icon: "info",
    text: "registrando ...",
  });
  const response = await easyFetch.fetchData("/feed/api/publication/push",{
    content: "publication-content"
  },"POST",true).catch(e=>{
    console.error("Error Fetching Publish",e)
    return null;
  })
  if(response && response.status && response.status=="ok"){
    return Swal.fire({
      position: "top-end",
      icon: "success",
      title: response.msg,
      showConfirmButton: false,
      timer: 1000,
    });
  }
  return Swal.fire({
    position: "top-end",
    icon: "error",
    title: "No se pudo publicar el post",
    showConfirmButton: false,
    timer: 1000,
  });
}
async function getPublications(){
  const response = await easyFetch.fetchData("/feed/api/publication/getall",{},"POST",false).catch(e=>{
    console.error("Error Fetching Publish",e)
    return null;
  })
  console.log("response",response);
}
