import { Directus } from "@tspvivek/refine-directus";

export const API_URL = "https://directus-production-04b1.up.railway.app/";

export const directusClient = new Directus(API_URL);