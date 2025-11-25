export async function loginService(email: string, password: string) {
  const response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1"
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al iniciar sesión");
  }

  return data.token;
}
