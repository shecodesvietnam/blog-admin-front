const token = localStorage.getItem("x-auth-token");

export default function Auth() {
  if (token === undefined || token === null) {
    window.location.replace("/");
  }
}
