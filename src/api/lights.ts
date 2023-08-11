import type { LightModel } from "../models/light.model";
import request from "../utils/request";

const lightsAPI = {
  list: () => request.get("/lights"),
  update: (id: string, light: LightModel) =>
    request.put(`/lights/${id}`, light),
};

export default lightsAPI;
