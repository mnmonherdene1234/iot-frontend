import qs from "qs";

const host = "https://api-iot.websitedevelopers.lol";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  headers?: { [key: string]: string };
}

const request = async <T>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  let path = `${host}${url}`;

  if (options?.data && options.method === "GET") {
    path += `?${qs.stringify(options.data)}`;
  }

  try {
    let token = "";

    // if (localStorage) {
    //   const storageToken = window?.localStorage?.getItem("token");

    //   if (storageToken) {
    //     token += storageToken;
    //   }
    // }

    const response: Response = await fetch(path, {
      method: options?.method || "GET",
      body:
        options?.data && options.method !== "GET"
          ? JSON.stringify(options.data)
          : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`${(await response.json())?.detail || "ERROR"}`);
    }

    const body = await response.json();
    return body as T;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

export default {
  get: <T>(url: string, data?: any) => request<T>(url, { method: "GET", data }),
  post: <T>(url: string, data?: any) =>
    request<T>(url, { method: "POST", data }),
  put: <T>(url: string, data?: any) => request<T>(url, { method: "PUT", data }),
  patch: <T>(url: string, data?: any) =>
    request<T>(url, { method: "PATCH", data }),
  delete: <T>(url: string, data?: any) =>
    request<T>(url, { method: "DELETE", data }),
};
